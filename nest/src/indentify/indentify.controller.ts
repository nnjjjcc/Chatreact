import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { IndentifyService } from './indentify.service';
import * as svgCaptcha from 'svg-captcha';
@Controller('indentify')
export class IndentifyController {
    constructor(private readonly IndentifyService: IndentifyService) { }
    //创建验证码
    @Get('code')
    createCaptcha(@Req() req, @Res() res) {
        //验证码
        const captcha = svgCaptcha.create({
            size: 5, //字符的个数
            fontSize: Math.floor(Math.random() * 10) + 40, //生成40~50大小的验证码
            width: 120, //宽度
            height: 32, //高度
            ignoreChars: '0oO1ilI',
            noise: 2, // 干扰线
            color: true,
            background: '#eee',
        });
        //存储验证码记录到session
        req.session.code = captcha.text;
        //设置返回值类型，并返回
        res.type('image/svg+xml');
        res.send(captcha.data);
    }

    //校验验证码是否正确
    @Post('create')
    createUser(@Req() req, @Body() body) {
        if (req.session.code === body?.code) {
            return {
                code: 200,
                message: '验证码正确',
            };
        } else {
            return {
                code: 200,
                message: '验证码错误',
            };
        }
    }
}
