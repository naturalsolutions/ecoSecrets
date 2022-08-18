from sqlmodel import Session, SQLModel


def get_objects(
    db: Session, object: SQLModel, order_by, skip: int = 0, limit: int = 100
):
    return db.query(object).order_by(order_by).offset(skip).limit(limit)


def get_object_id(db: Session, object: SQLModel, id: int):
    return db.query(object).filter(object.id == id)


def execute_query_all(
    db: Session, object: SQLModel, order_by, skip: int = 0, limit: int = 100
):
    return get_objects(
        db=db, object=object, order_by=order_by, skip=skip, limit=limit
    ).all()


def execute_query_first(db: Session, object: SQLModel, id: int):
    return get_object_id(db=db, object=object, id=id).first()
