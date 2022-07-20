from src.connectors.s3 import get_bucket_name


def test_get_bucket_name():
    # Arrange
    expected_bucket_name = "jean-paul-bucket"

    # Act
    bucket_name = get_bucket_name()

    # Assert
    assert bucket_name == expected_bucket_name
