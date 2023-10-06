import { Box, Flex, Heading, Spinner } from "@chakra-ui/react";
import { useEffect } from "react";
import { Outlet, useNavigate, useNavigation } from "react-router-dom";
import { useIsPageLoading } from "../contexts/AppContext";
import { Paths } from "../paths";
import { ComboSearchBox } from "../components/dropdown/ComboSearchBox";

export function Root() {
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
        >
          {window.matchMedia("(prefers-reduced-motion: reduce)").matches ===
          true ? (
            <Heading>Loading...</Heading>
          ) : (
            <Spinner
              thickness="6px"
              speed="0.65s"
              color={"#006acc"}
              size="xl"
            />
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
        backgroundColor="header.background"
      >
        <Outlet />
      </Box>
    </Box>
  );
}
