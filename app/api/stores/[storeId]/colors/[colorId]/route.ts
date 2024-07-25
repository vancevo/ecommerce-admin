import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; sizeId: string } }
) {
  try {
    if (!params.storeId) {
      return new NextResponse("storeId is Required", { status: 400 });
    }

    const { userId } = auth();
    const body = await req.json();
    const { name, value } = body;

    if (!userId) {
      return new NextResponse("Unauthenication", { status: 401 });
    }

    if (!name || !value) {
      return new NextResponse("name or sizeId is Required", { status: 400 });
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

    const color = await prismadb.color.updateMany({
      where: {
        id: params.sizeId,
        storeId: params.storeId,
      },
      data: { name, value },
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log("[Color_PATCH]", error);
    return new NextResponse("Interal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; colorId: string } }
) {
  try {
    if (!params.storeId) {
      return new NextResponse("storeId is Required", { status: 400 });
    }

    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenication", { status: 401 });
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

    const response = await prismadb.color.deleteMany({
      where: {
        id: params.colorId,
      },
    });
    return NextResponse.json(response);
  } catch (error) {
    console.log("[color_DELETE]", error);
  }
}
