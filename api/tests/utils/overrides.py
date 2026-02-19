from typing import Generator

from sqlmodel import Session

from tests.utils.test_db import engine


def override_get_session() -> Generator:
    with Session(engine) as session:
        yield session


def fake_get_current_token(credentials=None):
    """
    Interprète les "fake tokens" utilisés dans les headers
    et retourne un dict compatible avec ton code.
    """
    
    return {
        'sub': 'adminid', 
        'realm_access': {'roles': ['default-roles-test-ecosecrets', 
                                'offline_access', 'uma_authorization']}, 
        'email_verified': True, 
        'name': 'admin admin', 
        'preferred_username': 'admin', 
        'given_name': 'admin', 
        'family_name': 'admin', 
        'email': 'admin@ecosecrets'
    }

   