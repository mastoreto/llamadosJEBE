import React from 'react';
import IconConstructorComponent from './IconConstructorComponent';

interface WizardProgress {
  processStep: number;
  steps: {
    icon: string;
  }[];
}

const WizardProgressComponent: React.FC<WizardProgress> = ({ processStep, steps }) => {
  return (
    <>
      <div className='w-full py-6'>
        <div className='flex'>
          {steps.map((step: {icon: string}, index: number) => (
            <>
              {index === 0 ? (
                <div className='w-1/3' key={`progress-element-${index}`}>
                  <div className='relative mb-2'>
                    <div
                      className={`${
                        processStep > index
                          ? 'bg-green-500 '
                          : 'bg-purpure-sigueme-1 border-2 border-purpure-sigueme-1 rounded-full'
                      } w-10 h-10 mx-auto rounded-full text-lg flex items-center`}
                    >
                      <span
                        className={`${
                          processStep > index ? 'text-white' : 'text-yellow-sigueme'
                        } text-center w-full flex items-center justify-center`}
                      >
                        {processStep > index ? (
                          <IconConstructorComponent iconType={'check'} />
                        ) : (
                          <IconConstructorComponent iconType={step.icon} />
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className='w-1/3'>
                    <div className='relative mb-2'>
                      <div
                        className='absolute flex align-center items-center align-middle content-center'
                        style={{
                          width: 'calc(100% - 2.5rem - 1rem)',
                          top: '50%',
                          transform: 'translate(-50%, -50%)',
                        }}
                      >
                        <div className='w-full bg-gray-200 rounded items-center align-middle align-center flex-1'>
                          <div
                            className={`${
                              processStep > index - 1 ? 'w-full' : 'w-0'
                            } bg-green-500 py-1 rounded transition-width duration-500 ease-in-out`}
                          ></div>
                        </div>
                      </div>

                      <div
                        className={`${
                          processStep > index || processStep === steps.length - 1
                            ? 'bg-green-500'
                            : 'bg-purpure-sigueme-1 border-2 border-purpure-sigueme-1 rounded-full'
                        } w-10 h-10 mx-auto rounded-full text-lg flex items-center`}
                      >
                        <span
                          className={`${
                            processStep > index || processStep === steps.length - 1
                              ? 'text-white'
                              : 'text-yellow-sigueme'
                          } text-center w-full flex items-center justify-center`}
                        >
                          {processStep > index || processStep === steps.length - 1 ? (
                            <IconConstructorComponent iconType={'check'} />
                          ) : (
                            <IconConstructorComponent iconType={step.icon} />
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default WizardProgressComponent;
