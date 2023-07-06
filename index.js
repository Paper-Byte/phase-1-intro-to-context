// Your code here
const createEmployeeRecord = (employeeArray) => {
  return {
    firstName: employeeArray[0],
    familyName: employeeArray[1],
    title: employeeArray[2],
    payPerHour: employeeArray[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
};

const createEmployeeRecords = (employeeArrays) => {
  const employeeRecords = [];
  employeeArrays.forEach((e) => {
    employeeRecords.push(createEmployeeRecord(e));
  });
  return employeeRecords;
};

const createTimeInEvent = (employeeRecord, timeStamp) => {
  const newTimeInEvent = {
    type: 'TimeIn',
    hour: parseInt(timeStamp.slice(11)),
    date: timeStamp.slice(0, 10),
  };
  employeeRecord.timeInEvents.push(newTimeInEvent);
  return employeeRecord;
};

const createTimeOutEvent = (employeeRecord, timeStamp) => {
  const newTimeOutEvent = {
    type: 'TimeOut',
    hour: parseInt(timeStamp.slice(11)),
    date: timeStamp.slice(0, 10),
  };
  employeeRecord.timeOutEvents.push(newTimeOutEvent);
  return employeeRecord;
};

const hoursWorkedOnDate = (employeeRecord, workDate) => {
  let timeInHour = 0;
  let timeOutHour = 0;

  const timeInArray = employeeRecord.timeInEvents;
  for (let i = 0; i < timeInArray.length; i++) {
    if (timeInArray[i].date === workDate) {
      timeInHour = timeInArray[i].hour;
    }
  }

  const timeOutArray = employeeRecord.timeOutEvents;
  for (let i = 0; i < timeOutArray.length; i++) {
    if (timeOutArray[i].date === workDate) {
      timeOutHour = timeOutArray[i].hour;
    }
  }

  return (timeOutHour - timeInHour) / 100;
};

const wagesEarnedOnDate = (employeeRecord, workDate) => {
  return (
    employeeRecord.payPerHour *
    hoursWorkedOnDate(employeeRecord, workDate)
  );
};

const allWagesFor = (employeeRecord) => {
  let wagesEarned = 0;
  const workDays = employeeRecord.timeInEvents;
  workDays.forEach((element) => {
    wagesEarned += wagesEarnedOnDate(employeeRecord, element.date);
  });
  return wagesEarned;
};

const calculatePayroll = (employeeRecords) => {
  let allWages = 0;
  employeeRecords.forEach((element) => {
    allWages += allWagesFor(element);
  });
  return allWages;
};
