import { useEffect, useState } from "react";
import * as _ from "lodash";
import { removeChars } from "../utils";
import { OptionBase } from "chakra-react-select";

export interface IStyleItem extends OptionBase {
  value: string;
  label: string;
  __isNew__?: boolean;
}

export const useStyles = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [styles, setStyles] = useState<IStyleItem[]>([]);

  const update = () => {
    setIsLoading(true);
  };

  useEffect(() => {
    if (isLoading) {
      (async () => {
        const options = _.uniqWith(
          (await webflow.getAllStyles()).map((v) => ({
            value: `.${removeChars(v.getName())}`,
            label: v.getName(),
          })),
          (s1, s2) => s1.label === s2.label,
        ).sort((s1, s2) =>
          s1.label.toLowerCase() > s2.label.toLowerCase() ? 1 : -1,
        );

        setStyles(options);
        setIsLoading(false);
      })();
    }
  }, [isLoading]);

  return {
    styles,
    setStyles,
    isLoading,
    setIsLoading,
    update,
  };
};
