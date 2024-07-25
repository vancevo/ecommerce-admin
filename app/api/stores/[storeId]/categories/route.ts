import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  {
    params,
  }: {
    params: {
      storeId: string;
    };
  }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name, billboardId } = body;

    if (!userId) {
      return new NextResponse("Unauthenication", { status: 401 });
    }

    if (!name || !billboardId) {
      return new NextResponse("label or imageUrl is Required", { status: 400 });
    }
    //  Để thêm được thì phải kiểm tra xem store này có được quản lý tạo ra không, mỗi store là 1 chủ ?
    if (!params.storeId) {
      return new NextResponse("storeId is Required", { status: 400 });
    }
    // Check userId
    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const category = await prismadb.category.create({
      data: {
        name,
        billboardId,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[Billboard_POST]", error);
    return new NextResponse("Interal error", { status: 500 });
  }
}
