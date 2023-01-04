from sqlmodel import Session

from src.models.models import TemplateSequence


def get_template_sequence_by_mode(db: Session, mode: str, skip: int = 0, limit: int = 100):
    return (
        db.query(TemplateSequence)
        .filter(TemplateSequence.mode == mode)
        .order_by(TemplateSequence.id)
        .offset(skip)
        .limit(limit)
        .all()
    )


def post_template_sequence(db: Session, sequence: TemplateSequence):
    db_sequence = TemplateSequence(**sequence.dict())
    db.add(db_sequence)
    db.commit()
    db.refresh(db_sequence)
    return db_sequence
