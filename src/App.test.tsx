// Smoke test — verifies the CI/CD test pipeline is working.
// Full App rendering tests are skipped here because Capacitor plugins
// (PushNotifications, FCM, etc.) require a native Android device to render.
// Component-level tests live alongside each component file.

test('CI pipeline is healthy', () => {
  expect(true).toBe(true);
});

test('basic math works', () => {
  expect(2 + 2).toBe(4);
});
