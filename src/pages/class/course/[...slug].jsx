import { ComparingParamDataUserClass } from "@/api/user-class/ComparingParamDataUserClass";
import CodeEditor from "@/components/lib/monaco-text-editor/CodeEditor";
import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "react-query";

const Course = () => {
  const router = useRouter();
  const { slug } = router.query;

  // const userClassId = slug ? slug[0] : null;
  // const programmingLanguage = slug ? slug[1] : null;
  // const page = slug ? slug[2] : null;

  // const {
  //   isLoading: isLoadingComparingParamData,
  //   errorComparingParamData,
  //   dataComparingParamData,
  // } = useQuery(
  //   ["comparingParamData", { userClassId, programmingLanguage, page }],
  //   () =>
  //     ComparingParamDataUserClass(
  //       {
  //         user_class_id: userClassId,
  //         programming_language: programmingLanguage,
  //         order: page,
  //       },
  //       { enabled: !!userClassId && !!programmingLanguage && !!page }
  //     )
  // );

  // console.log("isii data", dataComparingParamData);

  return (
    <>
    <CodeEditor />
    </>
  );
};

export default Course;
