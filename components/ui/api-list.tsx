"use client";

import useOrigin from "@/hooks/use-origin";
import { ApiAlert } from "./api-alert";
import { useEffect } from "react";
import { useParams } from "next/navigation";

interface ApiListProps {
  entityName: string;
  entityIdName: string;
}

export const ApiList: React.FC<ApiListProps> = ({
  entityName,
  entityIdName,
}) => {
  const params = useParams();
  const origin = useOrigin();
  const baseUrl = `${origin}/api/stores/${params.storeId}`;
  useEffect(() => {
    console.log({ origin, baseUrl });
  }, []);

  return (
    <div className="flex flex-col gap-3">
      <ApiAlert title={"GET"} description={`${baseUrl}/${entityName}`} variant="public" />
      <ApiAlert title={"GET"} description={`${baseUrl}/${entityName}/{${entityIdName}}`} variant="public" />
      <ApiAlert title={"POST"} description={`${baseUrl}/${entityName}`} variant="admin" />
      <ApiAlert title={"PATCH"} description={`${baseUrl}/${entityName}/{${entityIdName}}`} variant="admin" />
      <ApiAlert title={"DELETE"} description={`${baseUrl}/${entityName}/{${entityIdName}}`} variant="admin" />
    </div>
  );
};
