import { Box, Flex, Heading, Spinner } from "@chakra-ui/react";
import { useEffect } from "react";
import { Outlet, useNavigate, useNavigation } from "react-router-dom";
import { useIsPageLoading } from "../contexts/AppContext";

export function Root() {
  const navigation = useNavigation();
  const navigate = useNavigate();
  const { isPageLoading, setIsPageLoading } = useIsPageLoading();

  useEffect(() => {
    navigate("/app", { replace: true });
  }, []);

  return (
    <Box>
      {navigation.state === "loading" || isPageLoading ? (
        <Flex
          position={"absolute"}
          width={"100vw"}
          height={"100vh"}
          alignItems={"center"}
          justifyContent={"center"}
          zIndex={"overlay"}
          backgroundColor={"rgba(0, 0, 0, 0.4)"}
        >
          {window.matchMedia("(prefers-reduced-motion: reduce)").matches ===
          true ? (
            <Heading>Loading...</Heading>
          ) : (
            <Spinner thickness="6px" speed="0.65s" color={"green"} size="xl" />
          )}
        </Flex>
      ) : (
        ""
      )}

      <Box
        m={2}
        overflow={
          navigation.state === "loading" || isPageLoading ? "hidden" : "inherit"
        }
      >
        <Outlet />
      </Box>
    </Box>
  );
}
