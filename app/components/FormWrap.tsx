// import React from "react";

// const FormWrap = ({ children }: { children: React.ReactNode }) => {
//   return (
//     <div className="min-h-fit h-full items-center justify-center pb-12 pt-12">
//       <div className="
//       max-w-[650px]
//        w-full flex flex-col gap-6 
//        items-center shadow-slate-200 
//        rounded-md p-4 
//        md:p-8"
//        >
//         {children}
//       </div>
//     </div>
//   );
// };

// export default FormWrap;
import React from "react";

const FormWrap = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex items-center justify-center pb-8 pt-8">
      <div className="max-w-[650px] w-full gap-6 flex flex-col shadow-slate-200 rounded-md p-4 md:p-8">
        {children}
      </div>
    </div>
  );
};

export default FormWrap;
