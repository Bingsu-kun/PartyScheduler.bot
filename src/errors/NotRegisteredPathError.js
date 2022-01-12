export default (req, res) => {
  res.status(404).send('<h1>페이지를 찾을 수 없습니다.</h1>');
}