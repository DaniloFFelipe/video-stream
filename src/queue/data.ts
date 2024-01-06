/* eslint-disable @typescript-eslint/no-namespace */
export const QueuesConst = {
  VIDEO_CONVERT: 'VIDEO_CONVERT',
  VIDEO_CONVERT_DONE: 'VIDEO_CONVERT_DONE',
  SEND_USER_CODE: 'SEND_USER_CODE',
};

export namespace Queues {
  export interface VideoConvertQueue {
    originalPath: string;
    fileName: string;
    fileId: string;
  }

  export interface VideoConvertDoneQueue {
    file: VideoConvertQueue;
    convert: {
      path: string;
    };
  }

  export interface SendUserCodeQueue {
    code: string;
    email: string;
  }
}
