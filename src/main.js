import "./styles/main.pcss";
if (process.env.NODE_ENV === "development") {
  require("file-loader!./index.pug");
}

import "./scripts/skills";
import "./scripts/reviews";
import "./scripts/works";
import "./scripts/full-menu";
import "./scripts/anchor-animated";