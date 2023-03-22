package controllers

type H struct {
	Message string      `json:"message"`
	Data    interface{} `json:"data"`
}

func NewH(message string, data interface{}) *H {
	H := new(H)
	H.Message = message
	H.Data = data
	return H
}

type ErrorMessagesH struct {
	Messages error       `json:"messages"`
	Data     interface{} `json:"data"`
}
type Message struct {
	Message map[interface{}]interface{}
}

func NewErroMessagesH(messages error, data interface{}) *ErrorMessagesH {
	H := new(ErrorMessagesH)
	H.Messages = messages
	H.Data = data
	return H
}
