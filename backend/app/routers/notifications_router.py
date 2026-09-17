from typing import Optional
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from sqlalchemy import and_, or_

from app.database import get_db
from app.models import User, Notification
from app.schemas import NotificationPage, MessageResponse
from app.deps import get_current_user, verify_csrf
from app.security import encode_cursor, decode_cursor

router = APIRouter(prefix="/notifications", tags=["notifications"])

PAGE_SIZE = 20
BATCH_SIZE = 500  # rows per commit when generating/processing large sets


@router.get("", response_model=NotificationPage)
def list_notifications(
    cursor: Optional[str] = Query(default=None),
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    """Keyset (cursor) pagination on (created_at, id) -- O(log n) per page via the
    composite index, unlike OFFSET pagination which degrades on large tables."""
    q = db.query(Notification).filter(Notification.user_id == user.id)

    if cursor:
        created_at, last_id = decode_cursor(cursor)
        # Composite keyset predicate written as OR instead of a tuple_() row-value
        # comparison, since not every backend (e.g. SQLite) compiles that the same way.
        q = q.filter(
            or_(
                Notification.created_at < created_at,
                and_(Notification.created_at == created_at, Notification.id < str(last_id)),
            )
        )

    rows = q.order_by(Notification.created_at.desc(), Notification.id.desc()).limit(PAGE_SIZE + 1).all()

    has_more = len(rows) > PAGE_SIZE
    page_rows = rows[:PAGE_SIZE]
    next_cursor = encode_cursor(page_rows[-1].created_at, page_rows[-1].id) if has_more and page_rows else None

    return NotificationPage(items=page_rows, next_cursor=next_cursor)


@router.post("/seed-demo", response_model=MessageResponse, dependencies=[Depends(verify_csrf)])
def seed_demo_notifications(
    count: int = Query(default=100, le=5000),
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    """Demonstrates chunk/batch processing for bulk inserts: commits in BATCH_SIZE
    chunks instead of one giant transaction, keeping memory and lock time bounded."""
    created = 0
    while created < count:
        chunk = min(BATCH_SIZE, count - created)
        db.bulk_save_objects(
            [Notification(user_id=user.id, message=f"Demo notification #{created + i + 1}") for i in range(chunk)]
        )
        db.commit()
        created += chunk

    return MessageResponse(message=f"Seeded {created} notifications in batches of {BATCH_SIZE}")
