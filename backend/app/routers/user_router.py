from fastapi import APIRouter, Depends

from app.models import User
from app.schemas import UserProfile
from app.deps import get_current_user

router = APIRouter(prefix="/user", tags=["user"])


@router.get("/profile", response_model=UserProfile)
def get_profile(user: User = Depends(get_current_user)):
    return user
