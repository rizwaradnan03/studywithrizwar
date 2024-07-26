import { ComparingParamDataUserClass } from "@/api/user-class/ComparingParamDataUserClass";
import CodeEditor from "@/components/lib/monaco-text-editor/CodeEditor";
import IsLoading from "@/components/lib/react-query/IsLoading";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useQuery } from "react-query";

const Course = () => {
  const router = useRouter();
  const { slug } = router.query;
  const session = useSession();

  const userEmail = session ? session.data?.user.email : "";

  const userClassId = slug ? slug[0] : null;
  const programmingLanguage = slug ? slug[1] : null;
  const order = slug ? slug[2] : null;

  const [output, setOutput] = useState("");
  const [isCodeSubmitted, setIsCodeSubmitted] = useState(false);

  const {
    isLoading: isLoadingComparingParamData,
    isError: isErrorComparingParamData,
    error: errorComparingParamData,
    data: dataComparingParamData,
  } = useQuery(
    [
      "comparingParamData",
      { userEmail, userClassId, programmingLanguage, order },
    ],
    () =>
      ComparingParamDataUserClass(
        {
          user_email: userEmail,
          user_class_id: userClassId,
          programming_language: programmingLanguage,
          order: order,
        },
        {
          enabled:
            !!userEmail && !!userClassId && !!programmingLanguage && !!order,
        }
      )
  );

  useEffect(() => {
    if (isCodeSubmitted && dataComparingParamData) {
      let modifiedOutput = output.replace("\n", "");
      if (
        modifiedOutput === dataComparingParamData.data.class_exercise.result
      ) {
        toast.success("Jawaban Anda Benar!");
      } else {
        toast.error("Jawaban Anda Salah!");
      }
      setIsCodeSubmitted(false);
    }
  }, [isCodeSubmitted, dataComparingParamData, output]);

  if (isErrorComparingParamData) {
    toast.error(errorComparingParamData.message);
    router.push("/class/classlist");
  }

  if (isLoadingComparingParamData) return <IsLoading />;

  return (
    <>
      <div className="flex flex-col lg:flex-row mb-5 gap-10 shadow-3 px-4 py-5">
        <div className="w-full lg:w-1/4">
          <h2 className="font-bold text-2xl text-center">
            {dataComparingParamData?.data.programming_language
              .charAt(0)
              .toUpperCase() +
              dataComparingParamData?.data.programming_language.slice(1)}
          </h2>
          <hr className="my-3" />
          <div
            dangerouslySetInnerHTML={{
              __html:
                dataComparingParamData?.data.class_exercise
                  .exercise_description,
            }}
          />
        </div>
        <CodeEditor
          programmingLanguage={
            dataComparingParamData?.data.programming_language
          }
          output={output}
          setOutput={setOutput}
          setIsCodeSubmitted={setIsCodeSubmitted}
        />
      </div>
      <div className="flex justify-between mb-10 shadow-3 px-4 py-5">
        <button>kembali</button>
        <button>lanjut</button>
      </div>
    </>
  );
};

export default Course;
