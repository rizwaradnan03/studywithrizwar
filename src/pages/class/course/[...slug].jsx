import { ComparingParamDataUserClass } from "@/api/user-class/ComparingParamDataUserClass";
import CodeEditor from "@/components/lib/monaco-text-editor/CodeEditor";
import IsLoading from "@/components/lib/react-query/IsLoading";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import toast from "react-hot-toast";
import { useQuery } from "react-query";

const Course = () => {
  const router = useRouter();
  const { slug } = router.query;
  const session = useSession();

  const userEmail = session ? session.data?.user.email : ""

  console.log("isi session", session);

  const userClassId = slug ? slug[0] : null;
  const programmingLanguage = slug ? slug[1] : null;
  const order = slug ? slug[2] : null;

  console.log("isi order", order);

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

  console.log("isi comparing data", dataComparingParamData);

  if (isErrorComparingParamData) {
    toast.error(errorComparingParamData.message);
    // router.push("/class/classlist");
  }

  if (isLoadingComparingParamData) return <IsLoading />;

  return (
    <>
      <div className="flex flex-col lg:flex-row mb-10 gap-10 shadow-3 px-4 py-5">
        <div className="w-full lg:w-1/4">
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
        />
      </div>
    </>
  );
};

export default Course;
