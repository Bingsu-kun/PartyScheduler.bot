const response = {
    success: true,
    data: '',
    error: '' 
}

response.data = '이게 바로 테스트 메세지다.';

export default (req, res) => {
    res.send(response)
}