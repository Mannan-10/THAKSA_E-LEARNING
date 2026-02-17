const BATCH_STATUS = Object.freeze({
  UPCOMING: "upcoming",
  STARTED: "started",
  COMPLETED: "completed",
});

const LIVE_SESSION_STATUS = Object.freeze({
  SCHEDULED: "scheduled",
  LIVE: "live",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
});

const LIVE_SESSION_PROVIDER = Object.freeze({
  GOOGLE_MEET: "google_meet",
  MANUAL: "manual",
});

const TRANSITIONS = Object.freeze({
  batch: {
    [BATCH_STATUS.UPCOMING]: [BATCH_STATUS.STARTED],
    [BATCH_STATUS.STARTED]: [BATCH_STATUS.COMPLETED],
    [BATCH_STATUS.COMPLETED]: [],
  },
  liveSession: {
    [LIVE_SESSION_STATUS.SCHEDULED]: [LIVE_SESSION_STATUS.LIVE, LIVE_SESSION_STATUS.CANCELLED],
    [LIVE_SESSION_STATUS.LIVE]: [LIVE_SESSION_STATUS.COMPLETED],
    [LIVE_SESSION_STATUS.COMPLETED]: [],
    [LIVE_SESSION_STATUS.CANCELLED]: [],
  },
});

const isOneOf = (value, options) => Object.values(options).includes(value);

const canTransition = (entity, from, to) => {
  const available = TRANSITIONS[entity]?.[from] || [];
  return available.includes(to);
};

export {
  BATCH_STATUS,
  LIVE_SESSION_STATUS,
  LIVE_SESSION_PROVIDER,
  isOneOf,
  canTransition,
};
