"use server";

import cuid from "@/lib/cuid";
import prisma from "@/lib/prisma";
import { Link } from "@prisma/client";

export const saveNewLink = async (link: string): Promise<Link | null> => {
  try {
    console.log("Started executing saveNewLink with param ", link);
    const savedLink = await findByActualLink(link);
    if (savedLink) {
      return savedLink;
    }
    const result = await prisma.link.create({
      data: {
        shortLink: cuid(),
        actualLink: link,
      },
    });
    return result;
  } catch (e) {
    console.log("Failed executing saveNewLink ", e);
    throw new Error("Failed to save link!");
  } finally {
    console.log("Finished executing saveNewLink() ");
  }
};

export const findByActualLink = async (
  actualLink: string,
): Promise<Link | null> => {
  try {
    console.log("Started executing findByActualLink() with param ", actualLink);
    const result = await prisma.link.findFirst({
      where: {
        actualLink,
      },
    });
    return result;
  } catch (e) {
    console.log("Failed executing findByActualLink() ", e);
    throw new Error("Failed to find!");
  } finally {
    console.log("Finished executing findByActualLink() ");
  }
};

export const findByShortLink = async (
  shortLink: string,
): Promise<Link | null> => {
  try {
    console.log("Started executing findByShortLink() with param ", shortLink);
    const result = await prisma.link.findUnique({
      where: {
        shortLink,
      },
    });
    return result;
  } catch (e) {
    console.log("Failed executing findByShortLink() ", e);
    throw new Error("Failed to find!");
  } finally {
    console.log("Finished executing findByShortLink() ");
  }
};
