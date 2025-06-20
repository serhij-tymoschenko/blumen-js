export const XML_REGEX = /<\?xml\s+[^?]*\?>/g
export const COMMENT_REGEX = /<!--[^-]+-->/g
export const DOCTYPE_REGEX = /<!DOCTYPE[^>]+>/g

export const SVG_REGEX = /<svg\b[^>]*?>/is
export const STYLE_REGEX = /<style\b[^>]*>[\s\S]*?<\/style>/i
export const SINGLE_DEFS_REGEX = /<defs\b[^>]*\/>/i;

export const SODI_1_REGEX = /<sodipodi:namedview\b[^>]*?>[\s\S]*?<\/sodipodi:namedview>/i
export const SODI_2_REGEX = /<SODI[^>]*>/i
export const INK_LABEL_REGEX = /\s*inkscape:label="[^"]*"/g
export const INK_GROUP_REGEX = /\s*inkscape:groupmode="[^"]*"/g

export const STYLE_PARAM_REGEX = /style="([^"']+)"/g;

export const EMPTY_LINE_REGEX = /^\s*[\r\n]/gm;

export const RGB_REGEX = /rgb\((\d+),\s*(\d+),\s*(\d+)\)/g
