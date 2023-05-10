import useReflare from "reflare";

const handleRequest = async (request: Request): Promise<Response> => {
  const reflare = await useReflare();

  reflare.push(
    {
      path: "/*",
      upstream: {
        domain: "www.forefront.ai",
        protocol: "https",
      }
    }
  );
  reflare.push(
    {
      path: "/chat/*",
      upstream: {
        domain: "chat.forefront.ai",
        protocol: "https",
      }
    },
  );
  reflare.push(
    {
      path: "/accounts/*",
      upstream: {
        domain: "accounts.forefront.ai",
        protocol: "https",
      }
    }
  );
  reflare.push(
    {
      path: "/clerk/*",
      upstream: {
        domain: "clerk.forefront.ai",
        protocol: "https",
      }
    }
  );

  return reflare.handle(request);
};

addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});
