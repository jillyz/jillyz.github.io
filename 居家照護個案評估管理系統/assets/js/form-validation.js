const usercheck= /^[A-Za-z.]{4,20}$/;
const passwordcheck=/^(?=.*[0-9])[ a-zA-Z0-9!@#$%^&*]{4,8}$/;
const emailcheck=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const mobilecheck=/^[0-9]{10}/;
const adresscheck=/^[a-zA-Z0-9\s,.'-]{3,}$/;