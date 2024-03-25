import connectMongoDB from "@/app/music/modules/mongodb";
import Music from "@/models/music";
import { NextResponse } from "next/server";
import { SortOrder } from "mongoose";
import { SUB_PER_PAGE_COUNT } from "../../modules/constants";

export async function GET(request: Request) {
  try {
    await connectMongoDB();

    const url = new URL(request.url);
    const currentPage = Number(url.searchParams.get("currentPage"));
    const currentTag = url.searchParams.get("currentTag") ?? "";

    interface SortKey {
      [key: string]: SortOrder;
    }

    const sortKey: SortKey = { score: -1, artist: 1 };

    interface Query {
      tagKeys: string;
    }

    let query: Query = { tagKeys: currentTag };

    const skipCount = SUB_PER_PAGE_COUNT * currentPage - SUB_PER_PAGE_COUNT;
    const tagData =
      currentPage === 1
        ? await Music.find(query).sort(sortKey).limit(SUB_PER_PAGE_COUNT)
        : await Music.find(query).sort(sortKey).skip(skipCount).limit(SUB_PER_PAGE_COUNT);
    const tagDataCount = await Music.find(query).count();

    return NextResponse.json({ tagData, tagDataCount });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}