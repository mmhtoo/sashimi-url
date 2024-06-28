import { findByShortLink } from "@/actions/link-actions";

export const GET = async (
  _request: Request,
  { params }: { params: { linkId: string } },
) => {
  const savedLink = await findByShortLink(params.linkId);
  if (!savedLink) {
    return Response.json({
      status: 404,
      message: "Resource not found!",
    });
  }
  Response.redirect(savedLink?.actualLink);
};
