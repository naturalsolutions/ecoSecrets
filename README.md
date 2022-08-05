# annotation

## dev

```
docker-compose up
```

## Generate client frontend
```
docker-compose exec frontend npm run generate
```
and indicate `BASE: 'http://localhost:3654'` in the OpenApi.ts file