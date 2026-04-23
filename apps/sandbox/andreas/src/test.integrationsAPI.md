
1. Sign Up

```
xh post :4000/api/auth/sign-up/email \
  --session=test-pilot \
  Origin:http://localhost:3000 \
  email="pilot@ccpilot.com" \
  password="Password123!" \
  name="The Pilot"
```

2. Sign In

```
xh post :4000/api/auth/sign-in/email \
  --session=test-pilot \
  Origin:http://localhost:3000 \
  email="pilot@ccpilot.com" \
  password="Password123!"
```

3. Connect

```
xh post :4000/api/integrations/connect \
  --session=test-pilot \
  Origin:http://localhost:3000 \
  token="firsttokentotest" \
  provider="CANVAS"
```

4. Update Token

```
xh post :4000/api/integrations/connect \
  --session=test-pilot \
  Origin:http://localhost:3000 \
  token="updated-token-for-testing" \
  provider="CANVAS"
```
