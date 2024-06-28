import { init } from "@paralleldrive/cuid2";

const cuid = init({
  random: Math.random,
  fingerprint: process.env.CUID_FINGERPRINT,
  length: Number(process.env.CUID_LENGTH) || 8,
});

export default cuid;
