import { Temporal, toTemporalInstant } from '@js-temporal/polyfill';
//@ts-ignore
Date.prototype.toTemporalInstant = toTemporalInstant;

const tz = Temporal.TimeZone.from('Asia/Seoul');
const now = tz.getPlainDateTimeFor!(Temporal.Now.instant());
const after10sec = now.add(
    Temporal.Duration.from({
        seconds: 10,
    })
);
const after30 = now.add(
    Temporal.Duration.from({
        days: 30,
    })
);

export const tzNow = now.toString();
export const tzAfter30 = after30.toString();
export const tzAfter10 = after10sec.toString();
