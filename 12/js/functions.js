const convertIntoMinutes = (time) => {
  const timeArray = time.split(':');

  return Number(timeArray[0]) * 60 + Number(timeArray[1]);
};

const isMeetingWithinWorkingHours = (workStart, workEnd, meetingStart, meetingDuration) => {
  const workStartMinutes = convertIntoMinutes(workStart);
  const workEndMinutes = convertIntoMinutes(workEnd);
  const meetingStartMinutes = convertIntoMinutes(meetingStart);

  const isMeetingStartLegitimate = meetingStartMinutes >= workStartMinutes;
  const isMeetingEndLegitimate = meetingStartMinutes + meetingDuration <= workEndMinutes;

  return isMeetingStartLegitimate && isMeetingEndLegitimate;
};

isMeetingWithinWorkingHours('08:00', '17:30', '14:00', 90); // true
isMeetingWithinWorkingHours('8:0', '10:0', '8:0', 120); // true
isMeetingWithinWorkingHours('08:00', '14:30', '14:00', 90); // false
isMeetingWithinWorkingHours('14:00', '17:30', '08:0', 90); // false
isMeetingWithinWorkingHours('8:00', '17:30', '08:00', 900); // false
