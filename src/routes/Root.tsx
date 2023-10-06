import { Box, Flex, Heading, usePrefersReducedMotion } from "@chakra-ui/react";
import { useEffect } from "react";
import { Outlet, useNavigate, useNavigation } from "react-router-dom";
import { useIsPageLoading } from "../contexts/AppContext";
import { Paths } from "../paths";

export function Root() {
  const reducedMotion = usePrefersReducedMotion();
  const navigation = useNavigation();
  const navigate = useNavigate();
  const { isPageLoading, setIsPageLoading } = useIsPageLoading();

  useEffect(() => {
    navigate(Paths.app, { replace: true });
  }, []);

  return (
    <Box margin={0} overflow={"hidden"}>
      {navigation.state === "loading" || isPageLoading ? (
        <Flex
          position={"absolute"}
          width={"100vw"}
          height={"100vh"}
          alignItems={"center"}
          justifyContent={"center"}
          zIndex={"overlay"}
          margin={0}
          backgroundColor={"rgba(0, 0, 0, 0.4)"}
          aria-hidden={"false"}
        >
          {reducedMotion ? (
            <Heading>Loading...</Heading>
          ) : (
            <Box width={"50vw"}>
              <Box className="progress-bar">
                <Box
                  className="progress-bar-value"
                  role="progressbar"
                  aria-valuenow={0}
                  aria-valuemax={100}
                ></Box>
              </Box>
            </Box>
          )}
        </Flex>
      ) : (
        ""
      )}

      <Box
        m={0}
        overflow={
          navigation.state === "loading" || isPageLoading ? "hidden" : "inherit"
        }
        aria-hidden={
          navigation.state === "loading" || isPageLoading ? "true" : undefined
        }
        backgroundColor="header.background"
      >
        <Outlet />
      </Box>
    </Box>
  );
}
