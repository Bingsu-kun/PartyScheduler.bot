export default (req, res) => {

    try {
        res.send('사용가능해요! (+ㅅ+)')
      } catch (error) {
        res.send(error)
      }

}
