import React, { useEffect } from 'react';
import { PaperClipIcon } from '@heroicons/react/20/solid';

const res = {
  2: { shortAnswerValues: [], choiceItem: 'ONE_COMPONENT' },
  4: { shortAnswerValues: [], choiceItem: 'DOT_DISPENSING' },
  5: { shortAnswerValues: ["2"], choiceItem: 'NO' },
  6: { shortAnswerValues: [] },
  7: { shortAnswerValues: [] },
  8: { shortAnswerValues: [] },
  9: { shortAnswerValues: [], choiceItem: 'NO' },
  10: { shortAnswerValues: [], choiceItem: 'ANAEROBIC_REACTION' },
  11: { shortAnswerValues: [], choiceItem: 'TANK' },
  12: { shortAnswerValues: [], choiceItem: 'Automated' },
  13: { shortAnswerValues: ["10","20","30"] , choiceItem: 'aa' },
  14: { shortAnswerValues: [], choiceItem: 'LOW_PRICE' }
};

function UserResponseLog(res:any) {
  useEffect(() => {
    console.log("666");
  }, []);

  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-lg">
      <div className="px-4 py-6 sm:px-6">
        <h3 className="text-base font-semibold leading-7 text-gray-900">Applicant Information</h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Personal details and application.</p>
      </div>
      <div className="border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          {Object.keys(res).map((key) => {
            const item = res[key];
            if (!item) return null;

            const { shortAnswerValues, choiceItem } = item;
            if (!shortAnswerValues && !choiceItem) return null;

            return (
              <div key={key} className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-900">{`${key}번질문`}</dt>
                <div className='flex justify-between'>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{choiceItem}</dd>
                  {shortAnswerValues?.length === 1 && <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{shortAnswerValues[0]}</dd>}
                  {shortAnswerValues?.length > 1 && (
                    <div className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      <ul className="flex flex-wrap gap-2">
                        {shortAnswerValues.map((value, index) => (
                          <li key={index}>
                            {index !== shortAnswerValues.length - 1 ? `${value},` : value}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium leading-6 text-gray-900">Attachments</dt>
            <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
                <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                  <div className="flex w-0 flex-1 items-center">
                    <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                    <div className="ml-4 flex min-w-0 flex-1 gap-2">
                      <span className="truncate font-medium">resume_back_end_developer.pdf</span>
                      <span className="flex-shrink-0 text-gray-400">2.4mb</span>
                    </div>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                      Download
                    </a>
                  </div>
                </li>
                <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                  <div className="flex w-0 flex-1 items-center">
                    <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                    <div className="ml-4 flex min-w-0 flex-1 gap-2">
                      <span className="truncate font-medium">coverletter_back_end_developer.pdf</span>
                      <span className="flex-shrink-0 text-gray-400">4.5mb</span>
                    </div>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                      Download
                    </a>
                  </div>
                </li>
              </ul>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

export default UserResponseLog;
