import { stringUtil } from "../../Utils";

const Abilities = ({ data }) => {
    return (
        <div className="info-wrapper">
            {data.abilities === undefined
                ? ""
                : data.abilities.map((pokemon, i) => {
                      return (
                          <div
                              className="chip-info"
                              style={{
                                  backgroundColor: "teal",
                                  color: "white",
                              }}
                              key={i}
                          >
                              {stringUtil.getFirstCharToUpperCase(pokemon.ability.name)}
                          </div>
                      );
                  })}
        </div>
    );
};

export default Abilities;
