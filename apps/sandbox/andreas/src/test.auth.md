# Auth Testing

## Sign Up

**Success:** Add new user
```bash
xh POST localhost:4000/api/auth/sign-up/email \
  --session=test-pilot \
  email="pilot@ccpilot.com" \
  password="Password123!" \
  name="The Pilot" Origin:http://localhost:3000
```

**Failure:** Attempting to use the same email again
```bash
xh POST localhost:4000/api/auth/sign-up/email \
  email="pilot@ccpilot.com" \
  password="Password123!" \
  name="I am the pilot"
```

## Sign In
**Success:** Logging in with an existing account.
```bash
xh POST localhost:4000/api/auth/sign-in/email \
  email="pilot@ccpilot.com" \
  password="Password123!" \
  --session=test-pilot Origin:http://localhost:4000
```

**Failure:** Wrong password.
```bash
xh POST localhost:4000/api/auth/sign-in/email \
  email="pilot@ccpilot.com" \
  password="WrongPassword"
```

---

## Get Session
**Authenticated:** Verify the the flattened `SafeUser`.
```bash
xh GET localhost:4000/api/auth/get-session --session=test-pilot
```

**Unauthenticated:** Run this without the session flag to see the 401 failure.
```bash
xh GET localhost:4000/api/auth/get-session
```

---

### Sign Out
**Sign Out:** Invalidate the session on the server and locally.
```bash
xh POST localhost:4000/api/auth/sign-out --session=test-pilot Origin:http://localhost:4000
```
