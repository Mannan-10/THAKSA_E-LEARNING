import crypto from "crypto";

const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
const GOOGLE_CALENDAR_EVENTS_URL = "https://www.googleapis.com/calendar/v3/calendars";

const getGoogleAccessToken = async () => {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error("Google OAuth env vars are missing");
  }

  const body = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    refresh_token: refreshToken,
    grant_type: "refresh_token",
  });

  const response = await fetch(GOOGLE_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Failed to get Google access token: ${details}`);
  }

  const data = await response.json();
  return data.access_token;
};

const hasGoogleMeetAutomationConfig = () =>
  Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET && process.env.GOOGLE_REFRESH_TOKEN);

const createGoogleMeetLink = async ({
  title,
  description,
  scheduledAt,
  durationMinutes = 60,
  timezone = "Asia/Kolkata",
}) => {
  const calendarId = process.env.GOOGLE_CALENDAR_ID || "primary";
  const accessToken = await getGoogleAccessToken();

  const start = new Date(scheduledAt);
  if (Number.isNaN(start.getTime())) {
    throw new Error("Invalid scheduled_at value");
  }

  const end = new Date(start.getTime() + Number(durationMinutes) * 60 * 1000);

  const payload = {
    summary: title,
    description: description || "",
    start: {
      dateTime: start.toISOString(),
      timeZone: timezone,
    },
    end: {
      dateTime: end.toISOString(),
      timeZone: timezone,
    },
    conferenceData: {
      createRequest: {
        requestId: `skillforge-${crypto.randomUUID()}`,
        conferenceSolutionKey: { type: "hangoutsMeet" },
      },
    },
  };

  const response = await fetch(
    `${GOOGLE_CALENDAR_EVENTS_URL}/${encodeURIComponent(calendarId)}/events?conferenceDataVersion=1`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Failed to create Google Meet event: ${details}`);
  }

  const data = await response.json();
  const meetLink = data.hangoutLink || data?.conferenceData?.entryPoints?.find((entry) => entry.entryPointType === "video")?.uri;

  if (!meetLink) {
    throw new Error("Google Meet link not found in Calendar API response");
  }

  return {
    meetLink,
    eventId: data.id,
    htmlLink: data.htmlLink,
  };
};

export { createGoogleMeetLink, hasGoogleMeetAutomationConfig };
