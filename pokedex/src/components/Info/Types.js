import { stringUtil, colorUtil, getTextColorBasedOnBgColor } from "../../Utils";

const Types = ({ data, mainColor }) => {
    return (
        <div>
            <div className="info-wrapper">
                {data.types === undefined
                    ? " "
                    : data.types.map((pokemon, i) => {
                          let color = colorUtil.getTypeColorDark(mainColor, i, [pokemon.type.name]);
                          return (
                              <div
                                  className="chip-info"
                                  style={{
                                      backgroundColor: colorUtil.getTypeColorDark(mainColor, i, [
                                          pokemon.type.name,
                                      ]),
                                      color: getTextColorBasedOnBgColor(color),
                                  }}
                                  key={i}
                              >
                                  {stringUtil.getFirstCharToUpperCase(pokemon.type.name)}
                              </div>
                          );
                      })}
            </div>
        </div>
    );
};

export default Types;
