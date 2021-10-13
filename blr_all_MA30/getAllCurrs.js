async function getCurrenciesIDs() {
  try {
    const params = new URLSearchParams({ periodicity: 0 });
    const data = await request(
      "https://www.nbrb.by/API/exrates/rates?" + params
    );

    return Promise.all(
      data.map(async ({ Cur_ID }) => {
        const {
          Cur_ID: ID,
          Cur_ParentID: ID_OLD,
          Cur_Name: NAME,
        } = await request(
          `https://www.nbrb.by/API/exrates/currencies/${Cur_ID}`
        );
        return { ID, ID_OLD, NAME };
      })
    );
  } catch (error) {
    console.error("Something went wrong...\n", error);
  }
}
