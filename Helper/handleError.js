class HandleError extends Error {
  constructor(message, statuscode) {
    super(message);
    this.statuscode = statuscode;
    this.name = "HandleError";
    Error.captureStackTrace(this, HandleError);
  }
}

export default HandleError;
