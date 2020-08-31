// DO NOT EDIT! This is a generated file. Edit the JSDoc in src/*.js instead and run 'npm run types'.

declare namespace xxgBuf {
    /** Properties of an AccountChangePush. */
    interface IAccountChangePush {

        /** 用户id */
        userId?: (Long|null);

        /** 账户余额 */
        balance?: (Long|null);
    }

    /** 服务器推送账变消息 */
    class AccountChangePush implements IAccountChangePush {

        /**
         * Constructs a new AccountChangePush.
         * @param [properties] Properties to set
         */
        constructor(properties?: IAccountChangePush);

        /** 用户id */
        public userId: Long;

        /** 账户余额 */
        public balance: Long;

        /**
         * Creates a new AccountChangePush instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AccountChangePush instance
         */
        public static create(properties?: IAccountChangePush): AccountChangePush;

        /**
         * Encodes the specified AccountChangePush message. Does not implicitly {@link AccountChangePush.verify|verify} messages.
         * @param message AccountChangePush message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: IAccountChangePush, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AccountChangePush message, length delimited. Does not implicitly {@link AccountChangePush.verify|verify} messages.
         * @param message AccountChangePush message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: IAccountChangePush, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AccountChangePush message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AccountChangePush
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AccountChangePush;

        /**
         * Decodes an AccountChangePush message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns AccountChangePush
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AccountChangePush;

        /**
         * Verifies an AccountChangePush message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AccountChangePush message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AccountChangePush
         */
        public static fromObject(object: { [k: string]: any }): AccountChangePush;

        /**
         * Creates a plain object from an AccountChangePush message. Also converts values to other types if specified.
         * @param message AccountChangePush
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AccountChangePush, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AccountChangePush to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RedBagConfigReq. */
    interface IRedBagConfigReq {
    }

    /** 点击绑定手机号 -红包配置 */
    class RedBagConfigReq implements IRedBagConfigReq {

        /**
         * Constructs a new RedBagConfigReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: IRedBagConfigReq);

        /**
         * Creates a new RedBagConfigReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RedBagConfigReq instance
         */
        public static create(properties?: IRedBagConfigReq): RedBagConfigReq;

        /**
         * Encodes the specified RedBagConfigReq message. Does not implicitly {@link RedBagConfigReq.verify|verify} messages.
         * @param message RedBagConfigReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: IRedBagConfigReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RedBagConfigReq message, length delimited. Does not implicitly {@link RedBagConfigReq.verify|verify} messages.
         * @param message RedBagConfigReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: IRedBagConfigReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RedBagConfigReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RedBagConfigReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): RedBagConfigReq;

        /**
         * Decodes a RedBagConfigReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RedBagConfigReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): RedBagConfigReq;

        /**
         * Verifies a RedBagConfigReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RedBagConfigReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RedBagConfigReq
         */
        public static fromObject(object: { [k: string]: any }): RedBagConfigReq;

        /**
         * Creates a plain object from a RedBagConfigReq message. Also converts values to other types if specified.
         * @param message RedBagConfigReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: RedBagConfigReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RedBagConfigReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RedBagConfigRet. */
    interface IRedBagConfigRet {

        /** RedBagConfigRet balance */
        balance?: (Long|null);

        /** RedBagConfigRet balanceNull */
        balanceNull?: (Long|null);
    }

    /** 服务器响应 */
    class RedBagConfigRet implements IRedBagConfigRet {

        /**
         * Constructs a new RedBagConfigRet.
         * @param [properties] Properties to set
         */
        constructor(properties?: IRedBagConfigRet);

        /** RedBagConfigRet balance. */
        public balance: Long;

        /** RedBagConfigRet balanceNull. */
        public balanceNull: Long;

        /** 最高可得xx元(前端需要除100) */
        public balanceOne?: ("balance"|"balanceNull");

        /**
         * Creates a new RedBagConfigRet instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RedBagConfigRet instance
         */
        public static create(properties?: IRedBagConfigRet): RedBagConfigRet;

        /**
         * Encodes the specified RedBagConfigRet message. Does not implicitly {@link RedBagConfigRet.verify|verify} messages.
         * @param message RedBagConfigRet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: IRedBagConfigRet, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RedBagConfigRet message, length delimited. Does not implicitly {@link RedBagConfigRet.verify|verify} messages.
         * @param message RedBagConfigRet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: IRedBagConfigRet, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RedBagConfigRet message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RedBagConfigRet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): RedBagConfigRet;

        /**
         * Decodes a RedBagConfigRet message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RedBagConfigRet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): RedBagConfigRet;

        /**
         * Verifies a RedBagConfigRet message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RedBagConfigRet message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RedBagConfigRet
         */
        public static fromObject(object: { [k: string]: any }): RedBagConfigRet;

        /**
         * Creates a plain object from a RedBagConfigRet message. Also converts values to other types if specified.
         * @param message RedBagConfigRet
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: RedBagConfigRet, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RedBagConfigRet to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a SendCodeReq. */
    interface ISendCodeReq {

        /** 手机号 */
        tel?: (string|null);
    }

    /** 前端请求 发送验证码 */
    class SendCodeReq implements ISendCodeReq {

        /**
         * Constructs a new SendCodeReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: ISendCodeReq);

        /** 手机号 */
        public tel: string;

        /**
         * Creates a new SendCodeReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SendCodeReq instance
         */
        public static create(properties?: ISendCodeReq): SendCodeReq;

        /**
         * Encodes the specified SendCodeReq message. Does not implicitly {@link SendCodeReq.verify|verify} messages.
         * @param message SendCodeReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: ISendCodeReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SendCodeReq message, length delimited. Does not implicitly {@link SendCodeReq.verify|verify} messages.
         * @param message SendCodeReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: ISendCodeReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SendCodeReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SendCodeReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SendCodeReq;

        /**
         * Decodes a SendCodeReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SendCodeReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SendCodeReq;

        /**
         * Verifies a SendCodeReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SendCodeReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SendCodeReq
         */
        public static fromObject(object: { [k: string]: any }): SendCodeReq;

        /**
         * Creates a plain object from a SendCodeReq message. Also converts values to other types if specified.
         * @param message SendCodeReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: SendCodeReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SendCodeReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a SendCodeRet. */
    interface ISendCodeRet {
    }

    /** 服务器响应 */
    class SendCodeRet implements ISendCodeRet {

        /**
         * Constructs a new SendCodeRet.
         * @param [properties] Properties to set
         */
        constructor(properties?: ISendCodeRet);

        /**
         * Creates a new SendCodeRet instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SendCodeRet instance
         */
        public static create(properties?: ISendCodeRet): SendCodeRet;

        /**
         * Encodes the specified SendCodeRet message. Does not implicitly {@link SendCodeRet.verify|verify} messages.
         * @param message SendCodeRet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: ISendCodeRet, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SendCodeRet message, length delimited. Does not implicitly {@link SendCodeRet.verify|verify} messages.
         * @param message SendCodeRet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: ISendCodeRet, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SendCodeRet message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SendCodeRet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SendCodeRet;

        /**
         * Decodes a SendCodeRet message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SendCodeRet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SendCodeRet;

        /**
         * Verifies a SendCodeRet message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SendCodeRet message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SendCodeRet
         */
        public static fromObject(object: { [k: string]: any }): SendCodeRet;

        /**
         * Creates a plain object from a SendCodeRet message. Also converts values to other types if specified.
         * @param message SendCodeRet
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: SendCodeRet, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SendCodeRet to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a BindingTelReq. */
    interface IBindingTelReq {

        /** 手机号 */
        tel?: (string|null);

        /** 验证码 */
        code?: (string|null);
    }

    /** 前端请求 个人信息或绑定有礼-手机号 */
    class BindingTelReq implements IBindingTelReq {

        /**
         * Constructs a new BindingTelReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: IBindingTelReq);

        /** 手机号 */
        public tel: string;

        /** 验证码 */
        public code: string;

        /**
         * Creates a new BindingTelReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BindingTelReq instance
         */
        public static create(properties?: IBindingTelReq): BindingTelReq;

        /**
         * Encodes the specified BindingTelReq message. Does not implicitly {@link BindingTelReq.verify|verify} messages.
         * @param message BindingTelReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: IBindingTelReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BindingTelReq message, length delimited. Does not implicitly {@link BindingTelReq.verify|verify} messages.
         * @param message BindingTelReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: IBindingTelReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BindingTelReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BindingTelReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): BindingTelReq;

        /**
         * Decodes a BindingTelReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BindingTelReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): BindingTelReq;

        /**
         * Verifies a BindingTelReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BindingTelReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BindingTelReq
         */
        public static fromObject(object: { [k: string]: any }): BindingTelReq;

        /**
         * Creates a plain object from a BindingTelReq message. Also converts values to other types if specified.
         * @param message BindingTelReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: BindingTelReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BindingTelReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a BindingTelRet. */
    interface IBindingTelRet {

        /** BindingTelRet balance */
        balance?: (Long|null);

        /** BindingTelRet balanceNull */
        balanceNull?: (Long|null);

        /** BindingTelRet totalBalance */
        totalBalance?: (Long|null);

        /** BindingTelRet totalBalanceNull */
        totalBalanceNull?: (Long|null);

        /** 用户昵称 */
        nickName?: (string|null);

        /** 手机号 */
        showMobile?: (string|null);
    }

    /** 服务器响应 */
    class BindingTelRet implements IBindingTelRet {

        /**
         * Constructs a new BindingTelRet.
         * @param [properties] Properties to set
         */
        constructor(properties?: IBindingTelRet);

        /** BindingTelRet balance. */
        public balance: Long;

        /** BindingTelRet balanceNull. */
        public balanceNull: Long;

        /** BindingTelRet totalBalance. */
        public totalBalance: Long;

        /** BindingTelRet totalBalanceNull. */
        public totalBalanceNull: Long;

        /** 用户昵称 */
        public nickName: string;

        /** 手机号 */
        public showMobile: string;

        /** 获得xx元(前端需要除100) */
        public balanceOne?: ("balance"|"balanceNull");

        /** 总金额 */
        public totalBalanceOne?: ("totalBalance"|"totalBalanceNull");

        /**
         * Creates a new BindingTelRet instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BindingTelRet instance
         */
        public static create(properties?: IBindingTelRet): BindingTelRet;

        /**
         * Encodes the specified BindingTelRet message. Does not implicitly {@link BindingTelRet.verify|verify} messages.
         * @param message BindingTelRet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: IBindingTelRet, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BindingTelRet message, length delimited. Does not implicitly {@link BindingTelRet.verify|verify} messages.
         * @param message BindingTelRet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: IBindingTelRet, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BindingTelRet message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BindingTelRet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): BindingTelRet;

        /**
         * Decodes a BindingTelRet message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BindingTelRet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): BindingTelRet;

        /**
         * Verifies a BindingTelRet message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BindingTelRet message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BindingTelRet
         */
        public static fromObject(object: { [k: string]: any }): BindingTelRet;

        /**
         * Creates a plain object from a BindingTelRet message. Also converts values to other types if specified.
         * @param message BindingTelRet
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: BindingTelRet, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BindingTelRet to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a BindingWxReq. */
    interface IBindingWxReq {

        /** BindingWxReq wxCode */
        wxCode?: (string|null);
    }

    /** 前端绑定微信 */
    class BindingWxReq implements IBindingWxReq {

        /**
         * Constructs a new BindingWxReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: IBindingWxReq);

        /** BindingWxReq wxCode. */
        public wxCode: string;

        /**
         * Creates a new BindingWxReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BindingWxReq instance
         */
        public static create(properties?: IBindingWxReq): BindingWxReq;

        /**
         * Encodes the specified BindingWxReq message. Does not implicitly {@link BindingWxReq.verify|verify} messages.
         * @param message BindingWxReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: IBindingWxReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BindingWxReq message, length delimited. Does not implicitly {@link BindingWxReq.verify|verify} messages.
         * @param message BindingWxReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: IBindingWxReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BindingWxReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BindingWxReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): BindingWxReq;

        /**
         * Decodes a BindingWxReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BindingWxReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): BindingWxReq;

        /**
         * Verifies a BindingWxReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BindingWxReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BindingWxReq
         */
        public static fromObject(object: { [k: string]: any }): BindingWxReq;

        /**
         * Creates a plain object from a BindingWxReq message. Also converts values to other types if specified.
         * @param message BindingWxReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: BindingWxReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BindingWxReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a BindingWxRet. */
    interface IBindingWxRet {

        /** 用户信息 */
        user?: (IUser|null);
    }

    /** 服务器响应 */
    class BindingWxRet implements IBindingWxRet {

        /**
         * Constructs a new BindingWxRet.
         * @param [properties] Properties to set
         */
        constructor(properties?: IBindingWxRet);

        /** 用户信息 */
        public user?: (IUser|null);

        /**
         * Creates a new BindingWxRet instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BindingWxRet instance
         */
        public static create(properties?: IBindingWxRet): BindingWxRet;

        /**
         * Encodes the specified BindingWxRet message. Does not implicitly {@link BindingWxRet.verify|verify} messages.
         * @param message BindingWxRet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: IBindingWxRet, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BindingWxRet message, length delimited. Does not implicitly {@link BindingWxRet.verify|verify} messages.
         * @param message BindingWxRet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: IBindingWxRet, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BindingWxRet message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BindingWxRet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): BindingWxRet;

        /**
         * Decodes a BindingWxRet message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BindingWxRet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): BindingWxRet;

        /**
         * Verifies a BindingWxRet message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BindingWxRet message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BindingWxRet
         */
        public static fromObject(object: { [k: string]: any }): BindingWxRet;

        /**
         * Creates a plain object from a BindingWxRet message. Also converts values to other types if specified.
         * @param message BindingWxRet
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: BindingWxRet, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BindingWxRet to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a User. */
    interface IUser {

        /** 用户id */
        id?: (Long|null);

        /** User headPortrait */
        headPortrait?: (string|null);

        /** User headPortraitNull */
        headPortraitNull?: (string|null);

        /** 用户手机号 */
        tel?: (string|null);

        /** 用户昵称 */
        nickname?: (string|null);

        /** User level */
        level?: (number|null);

        /** User levelNull */
        levelNull?: (number|null);

        /** 用户类型(例:1手机用户 2微信用户 3QQ用户) */
        userType?: (number|null);

        /** 用户uid */
        uid?: (string|null);
    }

    /** 用户信息 */
    class User implements IUser {

        /**
         * Constructs a new User.
         * @param [properties] Properties to set
         */
        constructor(properties?: IUser);

        /** 用户id */
        public id: Long;

        /** User headPortrait. */
        public headPortrait: string;

        /** User headPortraitNull. */
        public headPortraitNull: string;

        /** 用户手机号 */
        public tel: string;

        /** 用户昵称 */
        public nickname: string;

        /** User level. */
        public level: number;

        /** User levelNull. */
        public levelNull: number;

        /** 用户类型(例:1手机用户 2微信用户 3QQ用户) */
        public userType: number;

        /** 用户uid */
        public uid: string;

        /** 用户头像 */
        public headPortraitOne?: ("headPortrait"|"headPortraitNull");

        /** 用户等级 */
        public levelOne?: ("level"|"levelNull");

        /**
         * Creates a new User instance using the specified properties.
         * @param [properties] Properties to set
         * @returns User instance
         */
        public static create(properties?: IUser): User;

        /**
         * Encodes the specified User message. Does not implicitly {@link User.verify|verify} messages.
         * @param message User message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: IUser, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified User message, length delimited. Does not implicitly {@link User.verify|verify} messages.
         * @param message User message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: IUser, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a User message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns User
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): User;

        /**
         * Decodes a User message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns User
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): User;

        /**
         * Verifies a User message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a User message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns User
         */
        public static fromObject(object: { [k: string]: any }): User;

        /**
         * Creates a plain object from a User message. Also converts values to other types if specified.
         * @param message User
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: User, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this User to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a StallInfo. */
    interface IStallInfo {

        /** 摊位等级 */
        stallLevel?: (Long|null);

        /** 摊主id */
        tid?: (Long|null);

        /** 系统id */
        systemId?: (Long|null);
    }

    /** 摊位信息(51级后有摊主信息) */
    class StallInfo implements IStallInfo {

        /**
         * Constructs a new StallInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: IStallInfo);

        /** 摊位等级 */
        public stallLevel: Long;

        /** 摊主id */
        public tid: Long;

        /** 系统id */
        public systemId: Long;

        /**
         * Creates a new StallInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns StallInfo instance
         */
        public static create(properties?: IStallInfo): StallInfo;

        /**
         * Encodes the specified StallInfo message. Does not implicitly {@link StallInfo.verify|verify} messages.
         * @param message StallInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: IStallInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified StallInfo message, length delimited. Does not implicitly {@link StallInfo.verify|verify} messages.
         * @param message StallInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: IStallInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a StallInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns StallInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): StallInfo;

        /**
         * Decodes a StallInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns StallInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): StallInfo;

        /**
         * Verifies a StallInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a StallInfo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns StallInfo
         */
        public static fromObject(object: { [k: string]: any }): StallInfo;

        /**
         * Creates a plain object from a StallInfo message. Also converts values to other types if specified.
         * @param message StallInfo
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: StallInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this StallInfo to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a DailyTaskReq. */
    interface IDailyTaskReq {
    }

    /** 前端请求 每日任务 */
    class DailyTaskReq implements IDailyTaskReq {

        /**
         * Constructs a new DailyTaskReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: IDailyTaskReq);

        /**
         * Creates a new DailyTaskReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns DailyTaskReq instance
         */
        public static create(properties?: IDailyTaskReq): DailyTaskReq;

        /**
         * Encodes the specified DailyTaskReq message. Does not implicitly {@link DailyTaskReq.verify|verify} messages.
         * @param message DailyTaskReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: IDailyTaskReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified DailyTaskReq message, length delimited. Does not implicitly {@link DailyTaskReq.verify|verify} messages.
         * @param message DailyTaskReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: IDailyTaskReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a DailyTaskReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns DailyTaskReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): DailyTaskReq;

        /**
         * Decodes a DailyTaskReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns DailyTaskReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): DailyTaskReq;

        /**
         * Verifies a DailyTaskReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a DailyTaskReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns DailyTaskReq
         */
        public static fromObject(object: { [k: string]: any }): DailyTaskReq;

        /**
         * Creates a plain object from a DailyTaskReq message. Also converts values to other types if specified.
         * @param message DailyTaskReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: DailyTaskReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this DailyTaskReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a DailyTaskRet. */
    interface IDailyTaskRet {

        /** 任务列表 */
        taskInfo?: (ITaskInfo[]|null);
    }

    /** 服务器响应 */
    class DailyTaskRet implements IDailyTaskRet {

        /**
         * Constructs a new DailyTaskRet.
         * @param [properties] Properties to set
         */
        constructor(properties?: IDailyTaskRet);

        /** 任务列表 */
        public taskInfo: ITaskInfo[];

        /**
         * Creates a new DailyTaskRet instance using the specified properties.
         * @param [properties] Properties to set
         * @returns DailyTaskRet instance
         */
        public static create(properties?: IDailyTaskRet): DailyTaskRet;

        /**
         * Encodes the specified DailyTaskRet message. Does not implicitly {@link DailyTaskRet.verify|verify} messages.
         * @param message DailyTaskRet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: IDailyTaskRet, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified DailyTaskRet message, length delimited. Does not implicitly {@link DailyTaskRet.verify|verify} messages.
         * @param message DailyTaskRet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: IDailyTaskRet, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a DailyTaskRet message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns DailyTaskRet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): DailyTaskRet;

        /**
         * Decodes a DailyTaskRet message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns DailyTaskRet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): DailyTaskRet;

        /**
         * Verifies a DailyTaskRet message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a DailyTaskRet message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns DailyTaskRet
         */
        public static fromObject(object: { [k: string]: any }): DailyTaskRet;

        /**
         * Creates a plain object from a DailyTaskRet message. Also converts values to other types if specified.
         * @param message DailyTaskRet
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: DailyTaskRet, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this DailyTaskRet to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a TaskInfo. */
    interface ITaskInfo {

        /** 任务id 1开始 */
        taskId?: (number|null);

        /** 需要完成次数 */
        rule?: (number|null);

        /** TaskInfo actualNum */
        actualNum?: (number|null);

        /** TaskInfo actualNumNull */
        actualNumNull?: (number|null);

        /** TaskInfo status */
        status?: (number|null);

        /** TaskInfo statusNull */
        statusNull?: (number|null);

        /** TaskInfo taskType */
        taskType?: (number|null);

        /** TaskInfo taskTypeNull */
        taskTypeNull?: (number|null);

        /** 任务描述 */
        taskDesc?: (string|null);

        /** 类型(1金币 2红包) */
        rewardType?: (number|null);

        /** TaskInfo balance */
        balance?: (Long|null);

        /** TaskInfo balanceNull */
        balanceNull?: (Long|null);
    }

    /** 任务对象 */
    class TaskInfo implements ITaskInfo {

        /**
         * Constructs a new TaskInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: ITaskInfo);

        /** 任务id 1开始 */
        public taskId: number;

        /** 需要完成次数 */
        public rule: number;

        /** TaskInfo actualNum. */
        public actualNum: number;

        /** TaskInfo actualNumNull. */
        public actualNumNull: number;

        /** TaskInfo status. */
        public status: number;

        /** TaskInfo statusNull. */
        public statusNull: number;

        /** TaskInfo taskType. */
        public taskType: number;

        /** TaskInfo taskTypeNull. */
        public taskTypeNull: number;

        /** 任务描述 */
        public taskDesc: string;

        /** 类型(1金币 2红包) */
        public rewardType: number;

        /** TaskInfo balance. */
        public balance: Long;

        /** TaskInfo balanceNull. */
        public balanceNull: Long;

        /** 玩家实际完成次数 */
        public actualNumOne?: ("actualNum"|"actualNumNull");

        /** 状态(0可领取 1不可领取 2已领取) */
        public statusOne?: ("status"|"statusNull");

        /** 任务类型 0揽客 1看视频 2参与游戏 3开启宝箱 4吆喝 */
        public taskTypeOne?: ("taskType"|"taskTypeNull");

        /** 数量(金币或红包) */
        public balanceOne?: ("balance"|"balanceNull");

        /**
         * Creates a new TaskInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TaskInfo instance
         */
        public static create(properties?: ITaskInfo): TaskInfo;

        /**
         * Encodes the specified TaskInfo message. Does not implicitly {@link TaskInfo.verify|verify} messages.
         * @param message TaskInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: ITaskInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified TaskInfo message, length delimited. Does not implicitly {@link TaskInfo.verify|verify} messages.
         * @param message TaskInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: ITaskInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a TaskInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TaskInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): TaskInfo;

        /**
         * Decodes a TaskInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TaskInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): TaskInfo;

        /**
         * Verifies a TaskInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TaskInfo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TaskInfo
         */
        public static fromObject(object: { [k: string]: any }): TaskInfo;

        /**
         * Creates a plain object from a TaskInfo message. Also converts values to other types if specified.
         * @param message TaskInfo
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: TaskInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TaskInfo to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a DayReceiveReq. */
    interface IDayReceiveReq {

        /** 任务id */
        taskId?: (number|null);
    }

    /** 前端请求 每日任务-领取 */
    class DayReceiveReq implements IDayReceiveReq {

        /**
         * Constructs a new DayReceiveReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: IDayReceiveReq);

        /** 任务id */
        public taskId: number;

        /**
         * Creates a new DayReceiveReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns DayReceiveReq instance
         */
        public static create(properties?: IDayReceiveReq): DayReceiveReq;

        /**
         * Encodes the specified DayReceiveReq message. Does not implicitly {@link DayReceiveReq.verify|verify} messages.
         * @param message DayReceiveReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: IDayReceiveReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified DayReceiveReq message, length delimited. Does not implicitly {@link DayReceiveReq.verify|verify} messages.
         * @param message DayReceiveReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: IDayReceiveReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a DayReceiveReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns DayReceiveReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): DayReceiveReq;

        /**
         * Decodes a DayReceiveReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns DayReceiveReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): DayReceiveReq;

        /**
         * Verifies a DayReceiveReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a DayReceiveReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns DayReceiveReq
         */
        public static fromObject(object: { [k: string]: any }): DayReceiveReq;

        /**
         * Creates a plain object from a DayReceiveReq message. Also converts values to other types if specified.
         * @param message DayReceiveReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: DayReceiveReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this DayReceiveReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a DayReceiveRet. */
    interface IDayReceiveRet {

        /** 类型(1金币 2红包) */
        rewardType?: (number|null);

        /** DayReceiveRet balance */
        balance?: (Long|null);

        /** DayReceiveRet balanceNull */
        balanceNull?: (Long|null);

        /** DayReceiveRet totalBalance */
        totalBalance?: (Long|null);

        /** DayReceiveRet totalBalanceNull */
        totalBalanceNull?: (Long|null);
    }

    /** 服务器响应 */
    class DayReceiveRet implements IDayReceiveRet {

        /**
         * Constructs a new DayReceiveRet.
         * @param [properties] Properties to set
         */
        constructor(properties?: IDayReceiveRet);

        /** 类型(1金币 2红包) */
        public rewardType: number;

        /** DayReceiveRet balance. */
        public balance: Long;

        /** DayReceiveRet balanceNull. */
        public balanceNull: Long;

        /** DayReceiveRet totalBalance. */
        public totalBalance: Long;

        /** DayReceiveRet totalBalanceNull. */
        public totalBalanceNull: Long;

        /** 数量(金币或红包) */
        public balanceOne?: ("balance"|"balanceNull");

        /** 总数量(金币或红包) */
        public totalBalanceOne?: ("totalBalance"|"totalBalanceNull");

        /**
         * Creates a new DayReceiveRet instance using the specified properties.
         * @param [properties] Properties to set
         * @returns DayReceiveRet instance
         */
        public static create(properties?: IDayReceiveRet): DayReceiveRet;

        /**
         * Encodes the specified DayReceiveRet message. Does not implicitly {@link DayReceiveRet.verify|verify} messages.
         * @param message DayReceiveRet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: IDayReceiveRet, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified DayReceiveRet message, length delimited. Does not implicitly {@link DayReceiveRet.verify|verify} messages.
         * @param message DayReceiveRet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: IDayReceiveRet, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a DayReceiveRet message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns DayReceiveRet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): DayReceiveRet;

        /**
         * Decodes a DayReceiveRet message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns DayReceiveRet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): DayReceiveRet;

        /**
         * Verifies a DayReceiveRet message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a DayReceiveRet message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns DayReceiveRet
         */
        public static fromObject(object: { [k: string]: any }): DayReceiveRet;

        /**
         * Creates a plain object from a DayReceiveRet message. Also converts values to other types if specified.
         * @param message DayReceiveRet
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: DayReceiveRet, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this DayReceiveRet to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GradReceiveReq. */
    interface IGradReceiveReq {
    }

    /** 前端请求 等级奖励-可领取(领奖弹框) */
    class GradReceiveReq implements IGradReceiveReq {

        /**
         * Constructs a new GradReceiveReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: IGradReceiveReq);

        /**
         * Creates a new GradReceiveReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GradReceiveReq instance
         */
        public static create(properties?: IGradReceiveReq): GradReceiveReq;

        /**
         * Encodes the specified GradReceiveReq message. Does not implicitly {@link GradReceiveReq.verify|verify} messages.
         * @param message GradReceiveReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: IGradReceiveReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GradReceiveReq message, length delimited. Does not implicitly {@link GradReceiveReq.verify|verify} messages.
         * @param message GradReceiveReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: IGradReceiveReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GradReceiveReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GradReceiveReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): GradReceiveReq;

        /**
         * Decodes a GradReceiveReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GradReceiveReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): GradReceiveReq;

        /**
         * Verifies a GradReceiveReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GradReceiveReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GradReceiveReq
         */
        public static fromObject(object: { [k: string]: any }): GradReceiveReq;

        /**
         * Creates a plain object from a GradReceiveReq message. Also converts values to other types if specified.
         * @param message GradReceiveReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: GradReceiveReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GradReceiveReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GradReceiveRet. */
    interface IGradReceiveRet {

        /** 类型 1金币 2红包 3转盘 */
        type?: (number|null);

        /** GradReceiveRet gold */
        gold?: (Long|null);

        /** GradReceiveRet goldNull */
        goldNull?: (Long|null);

        /** GradReceiveRet count */
        count?: (Long|null);

        /** GradReceiveRet countNull */
        countNull?: (Long|null);

        /** GradReceiveRet totalGold */
        totalGold?: (Long|null);

        /** GradReceiveRet totalGoldNull */
        totalGoldNull?: (Long|null);

        /** GradReceiveRet status */
        status?: (Long|null);

        /** GradReceiveRet statusNull */
        statusNull?: (Long|null);

        /** xx级 */
        gradeLevel?: (number|null);
    }

    /** 服务器响应 */
    class GradReceiveRet implements IGradReceiveRet {

        /**
         * Constructs a new GradReceiveRet.
         * @param [properties] Properties to set
         */
        constructor(properties?: IGradReceiveRet);

        /** 类型 1金币 2红包 3转盘 */
        public type: number;

        /** GradReceiveRet gold. */
        public gold: Long;

        /** GradReceiveRet goldNull. */
        public goldNull: Long;

        /** GradReceiveRet count. */
        public count: Long;

        /** GradReceiveRet countNull. */
        public countNull: Long;

        /** GradReceiveRet totalGold. */
        public totalGold: Long;

        /** GradReceiveRet totalGoldNull. */
        public totalGoldNull: Long;

        /** GradReceiveRet status. */
        public status: Long;

        /** GradReceiveRet statusNull. */
        public statusNull: Long;

        /** xx级 */
        public gradeLevel: number;

        /** 金币 */
        public goldOne?: ("gold"|"goldNull");

        /** 双倍金币观看视频剩余次数 */
        public countOne?: ("count"|"countNull");

        /** 总金币 */
        public totalGoldOne?: ("totalGold"|"totalGoldNull");

        /** 状态 1:可领取 2：不可领取 */
        public statusOne?: ("status"|"statusNull");

        /**
         * Creates a new GradReceiveRet instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GradReceiveRet instance
         */
        public static create(properties?: IGradReceiveRet): GradReceiveRet;

        /**
         * Encodes the specified GradReceiveRet message. Does not implicitly {@link GradReceiveRet.verify|verify} messages.
         * @param message GradReceiveRet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: IGradReceiveRet, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GradReceiveRet message, length delimited. Does not implicitly {@link GradReceiveRet.verify|verify} messages.
         * @param message GradReceiveRet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: IGradReceiveRet, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GradReceiveRet message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GradReceiveRet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): GradReceiveRet;

        /**
         * Decodes a GradReceiveRet message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GradReceiveRet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): GradReceiveRet;

        /**
         * Verifies a GradReceiveRet message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GradReceiveRet message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GradReceiveRet
         */
        public static fromObject(object: { [k: string]: any }): GradReceiveRet;

        /**
         * Creates a plain object from a GradReceiveRet message. Also converts values to other types if specified.
         * @param message GradReceiveRet
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: GradReceiveRet, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GradReceiveRet to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GradVideoGetMoneyReq. */
    interface IGradVideoGetMoneyReq {

        /** 直接领取的金币 */
        money?: (Long|null);
    }

    /** 前端请求观看视频后领取双倍金币 */
    class GradVideoGetMoneyReq implements IGradVideoGetMoneyReq {

        /**
         * Constructs a new GradVideoGetMoneyReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: IGradVideoGetMoneyReq);

        /** 直接领取的金币 */
        public money: Long;

        /**
         * Creates a new GradVideoGetMoneyReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GradVideoGetMoneyReq instance
         */
        public static create(properties?: IGradVideoGetMoneyReq): GradVideoGetMoneyReq;

        /**
         * Encodes the specified GradVideoGetMoneyReq message. Does not implicitly {@link GradVideoGetMoneyReq.verify|verify} messages.
         * @param message GradVideoGetMoneyReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: IGradVideoGetMoneyReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GradVideoGetMoneyReq message, length delimited. Does not implicitly {@link GradVideoGetMoneyReq.verify|verify} messages.
         * @param message GradVideoGetMoneyReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: IGradVideoGetMoneyReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GradVideoGetMoneyReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GradVideoGetMoneyReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): GradVideoGetMoneyReq;

        /**
         * Decodes a GradVideoGetMoneyReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GradVideoGetMoneyReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): GradVideoGetMoneyReq;

        /**
         * Verifies a GradVideoGetMoneyReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GradVideoGetMoneyReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GradVideoGetMoneyReq
         */
        public static fromObject(object: { [k: string]: any }): GradVideoGetMoneyReq;

        /**
         * Creates a plain object from a GradVideoGetMoneyReq message. Also converts values to other types if specified.
         * @param message GradVideoGetMoneyReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: GradVideoGetMoneyReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GradVideoGetMoneyReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GradVideoGetMoneyRet. */
    interface IGradVideoGetMoneyRet {

        /** GradVideoGetMoneyRet balance */
        balance?: (Long|null);

        /** GradVideoGetMoneyRet balanceNull */
        balanceNull?: (Long|null);

        /** GradVideoGetMoneyRet totalBalance */
        totalBalance?: (Long|null);

        /** GradVideoGetMoneyRet totalBalanceNull */
        totalBalanceNull?: (Long|null);
    }

    /** 服务器响应 */
    class GradVideoGetMoneyRet implements IGradVideoGetMoneyRet {

        /**
         * Constructs a new GradVideoGetMoneyRet.
         * @param [properties] Properties to set
         */
        constructor(properties?: IGradVideoGetMoneyRet);

        /** GradVideoGetMoneyRet balance. */
        public balance: Long;

        /** GradVideoGetMoneyRet balanceNull. */
        public balanceNull: Long;

        /** GradVideoGetMoneyRet totalBalance. */
        public totalBalance: Long;

        /** GradVideoGetMoneyRet totalBalanceNull. */
        public totalBalanceNull: Long;

        /** 看完视频后 获得xx金币 */
        public balanceOne?: ("balance"|"balanceNull");

        /** 总金币 */
        public totalBalanceOne?: ("totalBalance"|"totalBalanceNull");

        /**
         * Creates a new GradVideoGetMoneyRet instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GradVideoGetMoneyRet instance
         */
        public static create(properties?: IGradVideoGetMoneyRet): GradVideoGetMoneyRet;

        /**
         * Encodes the specified GradVideoGetMoneyRet message. Does not implicitly {@link GradVideoGetMoneyRet.verify|verify} messages.
         * @param message GradVideoGetMoneyRet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: IGradVideoGetMoneyRet, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GradVideoGetMoneyRet message, length delimited. Does not implicitly {@link GradVideoGetMoneyRet.verify|verify} messages.
         * @param message GradVideoGetMoneyRet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: IGradVideoGetMoneyRet, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GradVideoGetMoneyRet message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GradVideoGetMoneyRet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): GradVideoGetMoneyRet;

        /**
         * Decodes a GradVideoGetMoneyRet message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GradVideoGetMoneyRet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): GradVideoGetMoneyRet;

        /**
         * Verifies a GradVideoGetMoneyRet message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GradVideoGetMoneyRet message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GradVideoGetMoneyRet
         */
        public static fromObject(object: { [k: string]: any }): GradVideoGetMoneyRet;

        /**
         * Creates a plain object from a GradVideoGetMoneyRet message. Also converts values to other types if specified.
         * @param message GradVideoGetMoneyRet
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: GradVideoGetMoneyRet, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GradVideoGetMoneyRet to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an InitReq. */
    interface IInitReq {
    }

    /** 前端请求主界面 */
    class InitReq implements IInitReq {

        /**
         * Constructs a new InitReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: IInitReq);

        /**
         * Creates a new InitReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns InitReq instance
         */
        public static create(properties?: IInitReq): InitReq;

        /**
         * Encodes the specified InitReq message. Does not implicitly {@link InitReq.verify|verify} messages.
         * @param message InitReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: IInitReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified InitReq message, length delimited. Does not implicitly {@link InitReq.verify|verify} messages.
         * @param message InitReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: IInitReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an InitReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns InitReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): InitReq;

        /**
         * Decodes an InitReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns InitReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): InitReq;

        /**
         * Verifies an InitReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an InitReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns InitReq
         */
        public static fromObject(object: { [k: string]: any }): InitReq;

        /**
         * Creates a plain object from an InitReq message. Also converts values to other types if specified.
         * @param message InitReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: InitReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this InitReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an InitRet. */
    interface IInitRet {

        /** InitRet user */
        user?: (IUser|null);

        /** 今日分红(前端需要除以100) */
        todayProfit?: (Long|null);

        /** 我的红包(前端需要除以100) */
        redBag?: (Long|null);

        /** 摊位列表(暂时不考虑) */
        stallList?: (IStallInfo[]|null);

        /** 当前收入 */
        currentRevenue?: (Long|null);

        /** 上限 */
        upperLimit?: (Long|null);

        /** 当前金币 */
        currentGoldCoin?: (Long|null);

        /** 下一级需要 */
        nextGoldCoin?: (Long|null);

        /** 幸运宝箱信息 */
        lBox?: (ILuckyBox|null);

        /** InitRet grade */
        grade?: (IGradeReward|null);

        /** 吆喝总次数 */
        yellCount?: (number|null);

        /** 按钮 */
        buttonList?: (IButton[]|null);

        /** 加速到期时间(秒) 0: 没有加速 */
        advUpTime?: (number|null);

        /** InitRet advUpTimeNull */
        advUpTimeNull?: (number|null);

        /** 等级产出/秒 */
        outputs?: (number|null);

        /** 离线收入 */
        offlineIncome?: (Long|null);

        /** InitRet offlineIncomeNull */
        offlineIncomeNull?: (Long|null);

        /** 加速倍数 */
        advMultiple?: (number|null);

        /** InitRet advMultipleNull */
        advMultipleNull?: (number|null);

        /** 剩余加速次数 */
        accelerateNumber?: (number|null);

        /** InitRet accelerateNumberNull */
        accelerateNumberNull?: (number|null);

        /** 是否绑定微信 true 绑定 ,false 没绑定 */
        bindWx?: (boolean|null);

        /** InitRet bindWxNull */
        bindWxNull?: (boolean|null);

        /** 看广告次数 */
        videoNumber?: (number|null);

        /** InitRet videoNumberNull */
        videoNumberNull?: (number|null);

        /** 管端配置得加速时间(秒) 0: 没有加速 */
        advUpTimeConfig?: (number|null);

        /** InitRet advUpTimeConfigNull */
        advUpTimeConfigNull?: (number|null);

        /** 是否提现过 true 提现过 */
        isWithdraw?: (boolean|null);

        /** InitRet isWithdrawNull */
        isWithdrawNull?: (boolean|null);

        /** 跑马灯频率 */
        marqueeFrequency?: (number|null);

        /** InitRet marqueeFrequencyNull */
        marqueeFrequencyNull?: (number|null);

        /** 跑马灯持续时间 */
        marqueeDuration?: (number|null);

        /** InitRet marqueeDurationNull */
        marqueeDurationNull?: (number|null);
    }

    /** 服务器响应 */
    class InitRet implements IInitRet {

        /**
         * Constructs a new InitRet.
         * @param [properties] Properties to set
         */
        constructor(properties?: IInitRet);

        /** InitRet user. */
        public user?: (IUser|null);

        /** 今日分红(前端需要除以100) */
        public todayProfit: Long;

        /** 我的红包(前端需要除以100) */
        public redBag: Long;

        /** 摊位列表(暂时不考虑) */
        public stallList: IStallInfo[];

        /** 当前收入 */
        public currentRevenue: Long;

        /** 上限 */
        public upperLimit: Long;

        /** 当前金币 */
        public currentGoldCoin: Long;

        /** 下一级需要 */
        public nextGoldCoin: Long;

        /** 幸运宝箱信息 */
        public lBox?: (ILuckyBox|null);

        /** InitRet grade. */
        public grade?: (IGradeReward|null);

        /** 吆喝总次数 */
        public yellCount: number;

        /** 按钮 */
        public buttonList: IButton[];

        /** 加速到期时间(秒) 0: 没有加速 */
        public advUpTime: number;

        /** InitRet advUpTimeNull. */
        public advUpTimeNull: number;

        /** 等级产出/秒 */
        public outputs: number;

        /** 离线收入 */
        public offlineIncome: Long;

        /** InitRet offlineIncomeNull. */
        public offlineIncomeNull: Long;

        /** 加速倍数 */
        public advMultiple: number;

        /** InitRet advMultipleNull. */
        public advMultipleNull: number;

        /** 剩余加速次数 */
        public accelerateNumber: number;

        /** InitRet accelerateNumberNull. */
        public accelerateNumberNull: number;

        /** 是否绑定微信 true 绑定 ,false 没绑定 */
        public bindWx: boolean;

        /** InitRet bindWxNull. */
        public bindWxNull: boolean;

        /** 看广告次数 */
        public videoNumber: number;

        /** InitRet videoNumberNull. */
        public videoNumberNull: number;

        /** 管端配置得加速时间(秒) 0: 没有加速 */
        public advUpTimeConfig: number;

        /** InitRet advUpTimeConfigNull. */
        public advUpTimeConfigNull: number;

        /** 是否提现过 true 提现过 */
        public isWithdraw: boolean;

        /** InitRet isWithdrawNull. */
        public isWithdrawNull: boolean;

        /** 跑马灯频率 */
        public marqueeFrequency: number;

        /** InitRet marqueeFrequencyNull. */
        public marqueeFrequencyNull: number;

        /** 跑马灯持续时间 */
        public marqueeDuration: number;

        /** InitRet marqueeDurationNull. */
        public marqueeDurationNull: number;

        /** InitRet advUpTimeOne. */
        public advUpTimeOne?: ("advUpTime"|"advUpTimeNull");

        /** InitRet offlineIncomeOne. */
        public offlineIncomeOne?: ("offlineIncome"|"offlineIncomeNull");

        /** InitRet advMultipleOne. */
        public advMultipleOne?: ("advMultiple"|"advMultipleNull");

        /** InitRet accelerateNumberOne. */
        public accelerateNumberOne?: ("accelerateNumber"|"accelerateNumberNull");

        /** InitRet bindWxOne. */
        public bindWxOne?: ("bindWx"|"bindWxNull");

        /** InitRet videoNumberOne. */
        public videoNumberOne?: ("videoNumber"|"videoNumberNull");

        /** InitRet advUpTimeConfigOne. */
        public advUpTimeConfigOne?: ("advUpTimeConfig"|"advUpTimeConfigNull");

        /** InitRet isWithdrawOne. */
        public isWithdrawOne?: ("isWithdraw"|"isWithdrawNull");

        /** InitRet marqueeFrequencyOne. */
        public marqueeFrequencyOne?: ("marqueeFrequency"|"marqueeFrequencyNull");

        /** InitRet marqueeDurationOne. */
        public marqueeDurationOne?: ("marqueeDuration"|"marqueeDurationNull");

        /**
         * Creates a new InitRet instance using the specified properties.
         * @param [properties] Properties to set
         * @returns InitRet instance
         */
        public static create(properties?: IInitRet): InitRet;

        /**
         * Encodes the specified InitRet message. Does not implicitly {@link InitRet.verify|verify} messages.
         * @param message InitRet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: IInitRet, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified InitRet message, length delimited. Does not implicitly {@link InitRet.verify|verify} messages.
         * @param message InitRet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: IInitRet, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an InitRet message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns InitRet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): InitRet;

        /**
         * Decodes an InitRet message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns InitRet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): InitRet;

        /**
         * Verifies an InitRet message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an InitRet message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns InitRet
         */
        public static fromObject(object: { [k: string]: any }): InitRet;

        /**
         * Creates a plain object from an InitRet message. Also converts values to other types if specified.
         * @param message InitRet
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: InitRet, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this InitRet to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a LuckyBox. */
    interface ILuckyBox {

        /** 状态(1.可领取,2.计时中,3.已领完) */
        boxStatus?: (number|null);

        /** 状态是计时中-对应的倒计时(单位:秒) */
        second?: (Long|null);
    }

    /** 幸运宝箱 */
    class LuckyBox implements ILuckyBox {

        /**
         * Constructs a new LuckyBox.
         * @param [properties] Properties to set
         */
        constructor(properties?: ILuckyBox);

        /** 状态(1.可领取,2.计时中,3.已领完) */
        public boxStatus: number;

        /** 状态是计时中-对应的倒计时(单位:秒) */
        public second: Long;

        /**
         * Creates a new LuckyBox instance using the specified properties.
         * @param [properties] Properties to set
         * @returns LuckyBox instance
         */
        public static create(properties?: ILuckyBox): LuckyBox;

        /**
         * Encodes the specified LuckyBox message. Does not implicitly {@link LuckyBox.verify|verify} messages.
         * @param message LuckyBox message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: ILuckyBox, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified LuckyBox message, length delimited. Does not implicitly {@link LuckyBox.verify|verify} messages.
         * @param message LuckyBox message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: ILuckyBox, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a LuckyBox message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns LuckyBox
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): LuckyBox;

        /**
         * Decodes a LuckyBox message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns LuckyBox
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): LuckyBox;

        /**
         * Verifies a LuckyBox message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a LuckyBox message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns LuckyBox
         */
        public static fromObject(object: { [k: string]: any }): LuckyBox;

        /**
         * Creates a plain object from a LuckyBox message. Also converts values to other types if specified.
         * @param message LuckyBox
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: LuckyBox, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this LuckyBox to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GradeReward. */
    interface IGradeReward {

        /** 状态 1:可领取 2：不可领取 */
        gradeStatus?: (number|null);

        /** GradeReward gradeStatusNull */
        gradeStatusNull?: (number|null);

        /** 不可领取状态 xx等级可领取 */
        gradeLevel?: (number|null);
    }

    /** Represents a GradeReward. */
    class GradeReward implements IGradeReward {

        /**
         * Constructs a new GradeReward.
         * @param [properties] Properties to set
         */
        constructor(properties?: IGradeReward);

        /** 状态 1:可领取 2：不可领取 */
        public gradeStatus: number;

        /** GradeReward gradeStatusNull. */
        public gradeStatusNull: number;

        /** 不可领取状态 xx等级可领取 */
        public gradeLevel: number;

        /** GradeReward levelRewardOne. */
        public levelRewardOne?: ("gradeStatus"|"gradeStatusNull");

        /**
         * Creates a new GradeReward instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GradeReward instance
         */
        public static create(properties?: IGradeReward): GradeReward;

        /**
         * Encodes the specified GradeReward message. Does not implicitly {@link GradeReward.verify|verify} messages.
         * @param message GradeReward message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: IGradeReward, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GradeReward message, length delimited. Does not implicitly {@link GradeReward.verify|verify} messages.
         * @param message GradeReward message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: IGradeReward, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GradeReward message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GradeReward
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): GradeReward;

        /**
         * Decodes a GradeReward message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GradeReward
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): GradeReward;

        /**
         * Verifies a GradeReward message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GradeReward message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GradeReward
         */
        public static fromObject(object: { [k: string]: any }): GradeReward;

        /**
         * Creates a plain object from a GradeReward message. Also converts values to other types if specified.
         * @param message GradeReward
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: GradeReward, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GradeReward to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Button. */
    interface IButton {

        /** 编号 */
        id?: (number|null);

        /** 按钮类型 */
        type?: (number|null);
    }

    /** Represents a Button. */
    class Button implements IButton {

        /**
         * Constructs a new Button.
         * @param [properties] Properties to set
         */
        constructor(properties?: IButton);

        /** 编号 */
        public id: number;

        /** 按钮类型 */
        public type: number;

        /**
         * Creates a new Button instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Button instance
         */
        public static create(properties?: IButton): Button;

        /**
         * Encodes the specified Button message. Does not implicitly {@link Button.verify|verify} messages.
         * @param message Button message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: IButton, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Button message, length delimited. Does not implicitly {@link Button.verify|verify} messages.
         * @param message Button message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: IButton, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Button message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Button
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Button;

        /**
         * Decodes a Button message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Button
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Button;

        /**
         * Verifies a Button message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Button message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Button
         */
        public static fromObject(object: { [k: string]: any }): Button;

        /**
         * Creates a plain object from a Button message. Also converts values to other types if specified.
         * @param message Button
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Button, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Button to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an InvitationReq. */
    interface IInvitationReq {
    }

    /** 前端请求 进入揽客页面 */
    class InvitationReq implements IInvitationReq {

        /**
         * Constructs a new InvitationReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: IInvitationReq);

        /**
         * Creates a new InvitationReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns InvitationReq instance
         */
        public static create(properties?: IInvitationReq): InvitationReq;

        /**
         * Encodes the specified InvitationReq message. Does not implicitly {@link InvitationReq.verify|verify} messages.
         * @param message InvitationReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: IInvitationReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified InvitationReq message, length delimited. Does not implicitly {@link InvitationReq.verify|verify} messages.
         * @param message InvitationReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: IInvitationReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an InvitationReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns InvitationReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): InvitationReq;

        /**
         * Decodes an InvitationReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns InvitationReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): InvitationReq;

        /**
         * Verifies an InvitationReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an InvitationReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns InvitationReq
         */
        public static fromObject(object: { [k: string]: any }): InvitationReq;

        /**
         * Creates a plain object from an InvitationReq message. Also converts values to other types if specified.
         * @param message InvitationReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: InvitationReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this InvitationReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an InvitationRet. */
    interface IInvitationRet {

        /** InvitationRet incomeSum */
        incomeSum?: (Long|null);

        /** InvitationRet incomeSumNull */
        incomeSumNull?: (Long|null);

        /** InvitationRet friendSum */
        friendSum?: (Long|null);

        /** InvitationRet friendSumNull */
        friendSumNull?: (Long|null);

        /** InvitationRet nonactivated */
        nonactivated?: (Long|null);

        /** InvitationRet nonactivatedNull */
        nonactivatedNull?: (Long|null);

        /** 邀请码 */
        invitationCode?: (string|null);
    }

    /** 服务器响应 */
    class InvitationRet implements IInvitationRet {

        /**
         * Constructs a new InvitationRet.
         * @param [properties] Properties to set
         */
        constructor(properties?: IInvitationRet);

        /** InvitationRet incomeSum. */
        public incomeSum: Long;

        /** InvitationRet incomeSumNull. */
        public incomeSumNull: Long;

        /** InvitationRet friendSum. */
        public friendSum: Long;

        /** InvitationRet friendSumNull. */
        public friendSumNull: Long;

        /** InvitationRet nonactivated. */
        public nonactivated: Long;

        /** InvitationRet nonactivatedNull. */
        public nonactivatedNull: Long;

        /** 邀请码 */
        public invitationCode: string;

        /** 累计邀请收入 */
        public incomeSumOne?: ("incomeSum"|"incomeSumNull");

        /** 累计邀请好友数 */
        public friendSumOne?: ("friendSum"|"friendSumNull");

        /** 待激活好友 */
        public nonactivatedOne?: ("nonactivated"|"nonactivatedNull");

        /**
         * Creates a new InvitationRet instance using the specified properties.
         * @param [properties] Properties to set
         * @returns InvitationRet instance
         */
        public static create(properties?: IInvitationRet): InvitationRet;

        /**
         * Encodes the specified InvitationRet message. Does not implicitly {@link InvitationRet.verify|verify} messages.
         * @param message InvitationRet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: IInvitationRet, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified InvitationRet message, length delimited. Does not implicitly {@link InvitationRet.verify|verify} messages.
         * @param message InvitationRet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: IInvitationRet, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an InvitationRet message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns InvitationRet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): InvitationRet;

        /**
         * Decodes an InvitationRet message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns InvitationRet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): InvitationRet;

        /**
         * Verifies an InvitationRet message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an InvitationRet message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns InvitationRet
         */
        public static fromObject(object: { [k: string]: any }): InvitationRet;

        /**
         * Creates a plain object from an InvitationRet message. Also converts values to other types if specified.
         * @param message InvitationRet
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: InvitationRet, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this InvitationRet to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a MyInvitationReq. */
    interface IMyInvitationReq {
    }

    /** 前端请求 揽客-我的邀请 */
    class MyInvitationReq implements IMyInvitationReq {

        /**
         * Constructs a new MyInvitationReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: IMyInvitationReq);

        /**
         * Creates a new MyInvitationReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MyInvitationReq instance
         */
        public static create(properties?: IMyInvitationReq): MyInvitationReq;

        /**
         * Encodes the specified MyInvitationReq message. Does not implicitly {@link MyInvitationReq.verify|verify} messages.
         * @param message MyInvitationReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: IMyInvitationReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified MyInvitationReq message, length delimited. Does not implicitly {@link MyInvitationReq.verify|verify} messages.
         * @param message MyInvitationReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: IMyInvitationReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a MyInvitationReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MyInvitationReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): MyInvitationReq;

        /**
         * Decodes a MyInvitationReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MyInvitationReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): MyInvitationReq;

        /**
         * Verifies a MyInvitationReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a MyInvitationReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MyInvitationReq
         */
        public static fromObject(object: { [k: string]: any }): MyInvitationReq;

        /**
         * Creates a plain object from a MyInvitationReq message. Also converts values to other types if specified.
         * @param message MyInvitationReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: MyInvitationReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this MyInvitationReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a MyInvitationRet. */
    interface IMyInvitationRet {

        /** 邀请好友列表 */
        invFriend?: (IInvitationFriend[]|null);
    }

    /** 服务器响应 */
    class MyInvitationRet implements IMyInvitationRet {

        /**
         * Constructs a new MyInvitationRet.
         * @param [properties] Properties to set
         */
        constructor(properties?: IMyInvitationRet);

        /** 邀请好友列表 */
        public invFriend: IInvitationFriend[];

        /**
         * Creates a new MyInvitationRet instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MyInvitationRet instance
         */
        public static create(properties?: IMyInvitationRet): MyInvitationRet;

        /**
         * Encodes the specified MyInvitationRet message. Does not implicitly {@link MyInvitationRet.verify|verify} messages.
         * @param message MyInvitationRet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: IMyInvitationRet, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified MyInvitationRet message, length delimited. Does not implicitly {@link MyInvitationRet.verify|verify} messages.
         * @param message MyInvitationRet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: IMyInvitationRet, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a MyInvitationRet message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MyInvitationRet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): MyInvitationRet;

        /**
         * Decodes a MyInvitationRet message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MyInvitationRet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): MyInvitationRet;

        /**
         * Verifies a MyInvitationRet message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a MyInvitationRet message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MyInvitationRet
         */
        public static fromObject(object: { [k: string]: any }): MyInvitationRet;

        /**
         * Creates a plain object from a MyInvitationRet message. Also converts values to other types if specified.
         * @param message MyInvitationRet
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: MyInvitationRet, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this MyInvitationRet to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an InvitationFriend. */
    interface IInvitationFriend {

        /** InvitationFriend nickname */
        nickname?: (string|null);

        /** InvitationFriend nicknameNull */
        nicknameNull?: (string|null);

        /** InvitationFriend money */
        money?: (Long|null);

        /** InvitationFriend moneyNull */
        moneyNull?: (Long|null);

        /** InvitationFriend status */
        status?: (number|null);

        /** InvitationFriend statusNull */
        statusNull?: (number|null);

        /** 玩家等级 */
        level?: (number|null);

        /** InvitationFriend headPortrait */
        headPortrait?: (string|null);

        /** InvitationFriend headPortraitNull */
        headPortraitNull?: (string|null);

        /** InvitationFriend id */
        id?: (Long|null);

        /** InvitationFriend idNull */
        idNull?: (Long|null);
    }

    /** 邀请好友对象 */
    class InvitationFriend implements IInvitationFriend {

        /**
         * Constructs a new InvitationFriend.
         * @param [properties] Properties to set
         */
        constructor(properties?: IInvitationFriend);

        /** InvitationFriend nickname. */
        public nickname: string;

        /** InvitationFriend nicknameNull. */
        public nicknameNull: string;

        /** InvitationFriend money. */
        public money: Long;

        /** InvitationFriend moneyNull. */
        public moneyNull: Long;

        /** InvitationFriend status. */
        public status: number;

        /** InvitationFriend statusNull. */
        public statusNull: number;

        /** 玩家等级 */
        public level: number;

        /** InvitationFriend headPortrait. */
        public headPortrait: string;

        /** InvitationFriend headPortraitNull. */
        public headPortraitNull: string;

        /** InvitationFriend id. */
        public id: Long;

        /** InvitationFriend idNull. */
        public idNull: Long;

        /** 玩家昵称 */
        public nicknameOne?: ("nickname"|"nicknameNull");

        /** 奖励 */
        public moneyOne?: ("money"|"moneyNull");

        /** 状态(0可领取 1提醒升级 2提醒提现 3已领取) */
        public statusOne?: ("status"|"statusNull");

        /** 玩家头像 */
        public headPortraitOne?: ("headPortrait"|"headPortraitNull");

        /** InvitationFriend idOne. */
        public idOne?: ("id"|"idNull");

        /**
         * Creates a new InvitationFriend instance using the specified properties.
         * @param [properties] Properties to set
         * @returns InvitationFriend instance
         */
        public static create(properties?: IInvitationFriend): InvitationFriend;

        /**
         * Encodes the specified InvitationFriend message. Does not implicitly {@link InvitationFriend.verify|verify} messages.
         * @param message InvitationFriend message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: IInvitationFriend, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified InvitationFriend message, length delimited. Does not implicitly {@link InvitationFriend.verify|verify} messages.
         * @param message InvitationFriend message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: IInvitationFriend, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an InvitationFriend message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns InvitationFriend
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): InvitationFriend;

        /**
         * Decodes an InvitationFriend message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns InvitationFriend
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): InvitationFriend;

        /**
         * Verifies an InvitationFriend message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an InvitationFriend message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns InvitationFriend
         */
        public static fromObject(object: { [k: string]: any }): InvitationFriend;

        /**
         * Creates a plain object from an InvitationFriend message. Also converts values to other types if specified.
         * @param message InvitationFriend
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: InvitationFriend, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this InvitationFriend to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a MyReceiveReq. */
    interface IMyReceiveReq {

        /** MyReceiveReq id */
        id?: (Long|null);

        /** MyReceiveReq idNull */
        idNull?: (Long|null);
    }

    /** Represents a MyReceiveReq. */
    class MyReceiveReq implements IMyReceiveReq {

        /**
         * Constructs a new MyReceiveReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: IMyReceiveReq);

        /** MyReceiveReq id. */
        public id: Long;

        /** MyReceiveReq idNull. */
        public idNull: Long;

        /** MyReceiveReq idOne. */
        public idOne?: ("id"|"idNull");

        /**
         * Creates a new MyReceiveReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MyReceiveReq instance
         */
        public static create(properties?: IMyReceiveReq): MyReceiveReq;

        /**
         * Encodes the specified MyReceiveReq message. Does not implicitly {@link MyReceiveReq.verify|verify} messages.
         * @param message MyReceiveReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: IMyReceiveReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified MyReceiveReq message, length delimited. Does not implicitly {@link MyReceiveReq.verify|verify} messages.
         * @param message MyReceiveReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: IMyReceiveReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a MyReceiveReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MyReceiveReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): MyReceiveReq;

        /**
         * Decodes a MyReceiveReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MyReceiveReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): MyReceiveReq;

        /**
         * Verifies a MyReceiveReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a MyReceiveReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MyReceiveReq
         */
        public static fromObject(object: { [k: string]: any }): MyReceiveReq;

        /**
         * Creates a plain object from a MyReceiveReq message. Also converts values to other types if specified.
         * @param message MyReceiveReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: MyReceiveReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this MyReceiveReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a MyReceiveRet. */
    interface IMyReceiveRet {

        /** 类型(1金币 2红包) */
        rewardType?: (number|null);

        /** MyReceiveRet balance */
        balance?: (Long|null);

        /** MyReceiveRet balanceNull */
        balanceNull?: (Long|null);

        /** MyReceiveRet totalBalance */
        totalBalance?: (Long|null);

        /** MyReceiveRet totalBalanceNull */
        totalBalanceNull?: (Long|null);
    }

    /** Represents a MyReceiveRet. */
    class MyReceiveRet implements IMyReceiveRet {

        /**
         * Constructs a new MyReceiveRet.
         * @param [properties] Properties to set
         */
        constructor(properties?: IMyReceiveRet);

        /** 类型(1金币 2红包) */
        public rewardType: number;

        /** MyReceiveRet balance. */
        public balance: Long;

        /** MyReceiveRet balanceNull. */
        public balanceNull: Long;

        /** MyReceiveRet totalBalance. */
        public totalBalance: Long;

        /** MyReceiveRet totalBalanceNull. */
        public totalBalanceNull: Long;

        /** 数量(金币或红包) */
        public balanceOne?: ("balance"|"balanceNull");

        /** 总金额 */
        public totalBalanceOne?: ("totalBalance"|"totalBalanceNull");

        /**
         * Creates a new MyReceiveRet instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MyReceiveRet instance
         */
        public static create(properties?: IMyReceiveRet): MyReceiveRet;

        /**
         * Encodes the specified MyReceiveRet message. Does not implicitly {@link MyReceiveRet.verify|verify} messages.
         * @param message MyReceiveRet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: IMyReceiveRet, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified MyReceiveRet message, length delimited. Does not implicitly {@link MyReceiveRet.verify|verify} messages.
         * @param message MyReceiveRet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: IMyReceiveRet, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a MyReceiveRet message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MyReceiveRet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): MyReceiveRet;

        /**
         * Decodes a MyReceiveRet message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MyReceiveRet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): MyReceiveRet;

        /**
         * Verifies a MyReceiveRet message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a MyReceiveRet message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MyReceiveRet
         */
        public static fromObject(object: { [k: string]: any }): MyReceiveRet;

        /**
         * Creates a plain object from a MyReceiveRet message. Also converts values to other types if specified.
         * @param message MyReceiveRet
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: MyReceiveRet, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this MyReceiveRet to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an InviteUdp. */
    interface IInviteUdp {
    }

    /** Represents an InviteUdp. */
    class InviteUdp implements IInviteUdp {

        /**
         * Constructs a new InviteUdp.
         * @param [properties] Properties to set
         */
        constructor(properties?: IInviteUdp);

        /**
         * Creates a new InviteUdp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns InviteUdp instance
         */
        public static create(properties?: IInviteUdp): InviteUdp;

        /**
         * Encodes the specified InviteUdp message. Does not implicitly {@link InviteUdp.verify|verify} messages.
         * @param message InviteUdp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: IInviteUdp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified InviteUdp message, length delimited. Does not implicitly {@link InviteUdp.verify|verify} messages.
         * @param message InviteUdp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: IInviteUdp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an InviteUdp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns InviteUdp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): InviteUdp;

        /**
         * Decodes an InviteUdp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns InviteUdp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): InviteUdp;

        /**
         * Verifies an InviteUdp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an InviteUdp message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns InviteUdp
         */
        public static fromObject(object: { [k: string]: any }): InviteUdp;

        /**
         * Creates a plain object from an InviteUdp message. Also converts values to other types if specified.
         * @param message InviteUdp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: InviteUdp, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this InviteUdp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a LogoutUdp. */
    interface ILogoutUdp {
    }

    /** 登出 */
    class LogoutUdp implements ILogoutUdp {

        /**
         * Constructs a new LogoutUdp.
         * @param [properties] Properties to set
         */
        constructor(properties?: ILogoutUdp);

        /**
         * Creates a new LogoutUdp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns LogoutUdp instance
         */
        public static create(properties?: ILogoutUdp): LogoutUdp;

        /**
         * Encodes the specified LogoutUdp message. Does not implicitly {@link LogoutUdp.verify|verify} messages.
         * @param message LogoutUdp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: ILogoutUdp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified LogoutUdp message, length delimited. Does not implicitly {@link LogoutUdp.verify|verify} messages.
         * @param message LogoutUdp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: ILogoutUdp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a LogoutUdp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns LogoutUdp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): LogoutUdp;

        /**
         * Decodes a LogoutUdp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns LogoutUdp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): LogoutUdp;

        /**
         * Verifies a LogoutUdp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a LogoutUdp message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns LogoutUdp
         */
        public static fromObject(object: { [k: string]: any }): LogoutUdp;

        /**
         * Creates a plain object from a LogoutUdp message. Also converts values to other types if specified.
         * @param message LogoutUdp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: LogoutUdp, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this LogoutUdp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a LuckyBoxReceiveReq. */
    interface ILuckyBoxReceiveReq {
    }

    /** 前端请求 幸运宝箱-可领取(领奖弹框) */
    class LuckyBoxReceiveReq implements ILuckyBoxReceiveReq {

        /**
         * Constructs a new LuckyBoxReceiveReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: ILuckyBoxReceiveReq);

        /**
         * Creates a new LuckyBoxReceiveReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns LuckyBoxReceiveReq instance
         */
        public static create(properties?: ILuckyBoxReceiveReq): LuckyBoxReceiveReq;

        /**
         * Encodes the specified LuckyBoxReceiveReq message. Does not implicitly {@link LuckyBoxReceiveReq.verify|verify} messages.
         * @param message LuckyBoxReceiveReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: ILuckyBoxReceiveReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified LuckyBoxReceiveReq message, length delimited. Does not implicitly {@link LuckyBoxReceiveReq.verify|verify} messages.
         * @param message LuckyBoxReceiveReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: ILuckyBoxReceiveReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a LuckyBoxReceiveReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns LuckyBoxReceiveReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): LuckyBoxReceiveReq;

        /**
         * Decodes a LuckyBoxReceiveReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns LuckyBoxReceiveReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): LuckyBoxReceiveReq;

        /**
         * Verifies a LuckyBoxReceiveReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a LuckyBoxReceiveReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns LuckyBoxReceiveReq
         */
        public static fromObject(object: { [k: string]: any }): LuckyBoxReceiveReq;

        /**
         * Creates a plain object from a LuckyBoxReceiveReq message. Also converts values to other types if specified.
         * @param message LuckyBoxReceiveReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: LuckyBoxReceiveReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this LuckyBoxReceiveReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a LuckyBoxReceiveRet. */
    interface ILuckyBoxReceiveRet {

        /** 通过类型展示不同图标(1金币2红包3幸运转盘) */
        type?: (number|null);

        /** LuckyBoxReceiveRet balance */
        balance?: (Long|null);

        /** LuckyBoxReceiveRet balanceNull */
        balanceNull?: (Long|null);

        /** LuckyBoxReceiveRet count */
        count?: (Long|null);

        /** LuckyBoxReceiveRet countNull */
        countNull?: (Long|null);

        /** LuckyBoxReceiveRet totalGold */
        totalGold?: (Long|null);

        /** LuckyBoxReceiveRet totalGoldNull */
        totalGoldNull?: (Long|null);

        /** LuckyBoxReceiveRet status */
        status?: (Long|null);

        /** LuckyBoxReceiveRet statusNull */
        statusNull?: (Long|null);

        /** 状态是计时中-对应的倒计时(单位:秒) */
        second?: (Long|null);
    }

    /** 服务器响应 */
    class LuckyBoxReceiveRet implements ILuckyBoxReceiveRet {

        /**
         * Constructs a new LuckyBoxReceiveRet.
         * @param [properties] Properties to set
         */
        constructor(properties?: ILuckyBoxReceiveRet);

        /** 通过类型展示不同图标(1金币2红包3幸运转盘) */
        public type: number;

        /** LuckyBoxReceiveRet balance. */
        public balance: Long;

        /** LuckyBoxReceiveRet balanceNull. */
        public balanceNull: Long;

        /** LuckyBoxReceiveRet count. */
        public count: Long;

        /** LuckyBoxReceiveRet countNull. */
        public countNull: Long;

        /** LuckyBoxReceiveRet totalGold. */
        public totalGold: Long;

        /** LuckyBoxReceiveRet totalGoldNull. */
        public totalGoldNull: Long;

        /** LuckyBoxReceiveRet status. */
        public status: Long;

        /** LuckyBoxReceiveRet statusNull. */
        public statusNull: Long;

        /** 状态是计时中-对应的倒计时(单位:秒) */
        public second: Long;

        /** 金币直接领取多少金币   或红包 最高可获得xx */
        public balanceOne?: ("balance"|"balanceNull");

        /** 双倍金币观看视频剩余次数 */
        public countOne?: ("count"|"countNull");

        /** 总金币 */
        public totalGoldOne?: ("totalGold"|"totalGoldNull");

        /** 状态 1可领取 2计时中 3已领完 */
        public statusOne?: ("status"|"statusNull");

        /**
         * Creates a new LuckyBoxReceiveRet instance using the specified properties.
         * @param [properties] Properties to set
         * @returns LuckyBoxReceiveRet instance
         */
        public static create(properties?: ILuckyBoxReceiveRet): LuckyBoxReceiveRet;

        /**
         * Encodes the specified LuckyBoxReceiveRet message. Does not implicitly {@link LuckyBoxReceiveRet.verify|verify} messages.
         * @param message LuckyBoxReceiveRet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: ILuckyBoxReceiveRet, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified LuckyBoxReceiveRet message, length delimited. Does not implicitly {@link LuckyBoxReceiveRet.verify|verify} messages.
         * @param message LuckyBoxReceiveRet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: ILuckyBoxReceiveRet, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a LuckyBoxReceiveRet message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns LuckyBoxReceiveRet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): LuckyBoxReceiveRet;

        /**
         * Decodes a LuckyBoxReceiveRet message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns LuckyBoxReceiveRet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): LuckyBoxReceiveRet;

        /**
         * Verifies a LuckyBoxReceiveRet message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a LuckyBoxReceiveRet message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns LuckyBoxReceiveRet
         */
        public static fromObject(object: { [k: string]: any }): LuckyBoxReceiveRet;

        /**
         * Creates a plain object from a LuckyBoxReceiveRet message. Also converts values to other types if specified.
         * @param message LuckyBoxReceiveRet
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: LuckyBoxReceiveRet, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this LuckyBoxReceiveRet to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a VideoGetRedPacketReq. */
    interface IVideoGetRedPacketReq {
    }

    /** 前端请求观看视频后领取红包 */
    class VideoGetRedPacketReq implements IVideoGetRedPacketReq {

        /**
         * Constructs a new VideoGetRedPacketReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: IVideoGetRedPacketReq);

        /**
         * Creates a new VideoGetRedPacketReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns VideoGetRedPacketReq instance
         */
        public static create(properties?: IVideoGetRedPacketReq): VideoGetRedPacketReq;

        /**
         * Encodes the specified VideoGetRedPacketReq message. Does not implicitly {@link VideoGetRedPacketReq.verify|verify} messages.
         * @param message VideoGetRedPacketReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: IVideoGetRedPacketReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified VideoGetRedPacketReq message, length delimited. Does not implicitly {@link VideoGetRedPacketReq.verify|verify} messages.
         * @param message VideoGetRedPacketReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: IVideoGetRedPacketReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a VideoGetRedPacketReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns VideoGetRedPacketReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): VideoGetRedPacketReq;

        /**
         * Decodes a VideoGetRedPacketReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns VideoGetRedPacketReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): VideoGetRedPacketReq;

        /**
         * Verifies a VideoGetRedPacketReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a VideoGetRedPacketReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns VideoGetRedPacketReq
         */
        public static fromObject(object: { [k: string]: any }): VideoGetRedPacketReq;

        /**
         * Creates a plain object from a VideoGetRedPacketReq message. Also converts values to other types if specified.
         * @param message VideoGetRedPacketReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: VideoGetRedPacketReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this VideoGetRedPacketReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a VideoGetRedPacketRet. */
    interface IVideoGetRedPacketRet {

        /** VideoGetRedPacketRet balance */
        balance?: (Long|null);

        /** VideoGetRedPacketRet balanceNull */
        balanceNull?: (Long|null);

        /** VideoGetRedPacketRet totalBalance */
        totalBalance?: (Long|null);

        /** VideoGetRedPacketRet totalBalanceNull */
        totalBalanceNull?: (Long|null);

        /** VideoGetRedPacketRet status */
        status?: (Long|null);

        /** VideoGetRedPacketRet statusNull */
        statusNull?: (Long|null);

        /** 状态是计时中-对应的倒计时(单位:秒) */
        second?: (Long|null);
    }

    /** 服务器响应 */
    class VideoGetRedPacketRet implements IVideoGetRedPacketRet {

        /**
         * Constructs a new VideoGetRedPacketRet.
         * @param [properties] Properties to set
         */
        constructor(properties?: IVideoGetRedPacketRet);

        /** VideoGetRedPacketRet balance. */
        public balance: Long;

        /** VideoGetRedPacketRet balanceNull. */
        public balanceNull: Long;

        /** VideoGetRedPacketRet totalBalance. */
        public totalBalance: Long;

        /** VideoGetRedPacketRet totalBalanceNull. */
        public totalBalanceNull: Long;

        /** VideoGetRedPacketRet status. */
        public status: Long;

        /** VideoGetRedPacketRet statusNull. */
        public statusNull: Long;

        /** 状态是计时中-对应的倒计时(单位:秒) */
        public second: Long;

        /** 看完视频后 获得xx元(前端需要除100) */
        public balanceOne?: ("balance"|"balanceNull");

        /** 总金额 */
        public totalBalanceOne?: ("totalBalance"|"totalBalanceNull");

        /** 状态 1可领取 2计时中 3已领完 */
        public statusOne?: ("status"|"statusNull");

        /**
         * Creates a new VideoGetRedPacketRet instance using the specified properties.
         * @param [properties] Properties to set
         * @returns VideoGetRedPacketRet instance
         */
        public static create(properties?: IVideoGetRedPacketRet): VideoGetRedPacketRet;

        /**
         * Encodes the specified VideoGetRedPacketRet message. Does not implicitly {@link VideoGetRedPacketRet.verify|verify} messages.
         * @param message VideoGetRedPacketRet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: IVideoGetRedPacketRet, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified VideoGetRedPacketRet message, length delimited. Does not implicitly {@link VideoGetRedPacketRet.verify|verify} messages.
         * @param message VideoGetRedPacketRet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: IVideoGetRedPacketRet, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a VideoGetRedPacketRet message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns VideoGetRedPacketRet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): VideoGetRedPacketRet;

        /**
         * Decodes a VideoGetRedPacketRet message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns VideoGetRedPacketRet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): VideoGetRedPacketRet;

        /**
         * Verifies a VideoGetRedPacketRet message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a VideoGetRedPacketRet message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns VideoGetRedPacketRet
         */
        public static fromObject(object: { [k: string]: any }): VideoGetRedPacketRet;

        /**
         * Creates a plain object from a VideoGetRedPacketRet message. Also converts values to other types if specified.
         * @param message VideoGetRedPacketRet
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: VideoGetRedPacketRet, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this VideoGetRedPacketRet to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a VideoGetMoneyReq. */
    interface IVideoGetMoneyReq {
    }

    /** 前端请求观看视频后领取双倍金币 */
    class VideoGetMoneyReq implements IVideoGetMoneyReq {

        /**
         * Constructs a new VideoGetMoneyReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: IVideoGetMoneyReq);

        /**
         * Creates a new VideoGetMoneyReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns VideoGetMoneyReq instance
         */
        public static create(properties?: IVideoGetMoneyReq): VideoGetMoneyReq;

        /**
         * Encodes the specified VideoGetMoneyReq message. Does not implicitly {@link VideoGetMoneyReq.verify|verify} messages.
         * @param message VideoGetMoneyReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: IVideoGetMoneyReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified VideoGetMoneyReq message, length delimited. Does not implicitly {@link VideoGetMoneyReq.verify|verify} messages.
         * @param message VideoGetMoneyReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: IVideoGetMoneyReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a VideoGetMoneyReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns VideoGetMoneyReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): VideoGetMoneyReq;

        /**
         * Decodes a VideoGetMoneyReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns VideoGetMoneyReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): VideoGetMoneyReq;

        /**
         * Verifies a VideoGetMoneyReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a VideoGetMoneyReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns VideoGetMoneyReq
         */
        public static fromObject(object: { [k: string]: any }): VideoGetMoneyReq;

        /**
         * Creates a plain object from a VideoGetMoneyReq message. Also converts values to other types if specified.
         * @param message VideoGetMoneyReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: VideoGetMoneyReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this VideoGetMoneyReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a VideoGetMoneyRet. */
    interface IVideoGetMoneyRet {

        /** VideoGetMoneyRet balance */
        balance?: (Long|null);

        /** VideoGetMoneyRet balanceNull */
        balanceNull?: (Long|null);

        /** VideoGetMoneyRet totalBalance */
        totalBalance?: (Long|null);

        /** VideoGetMoneyRet totalBalanceNull */
        totalBalanceNull?: (Long|null);
    }

    /** 服务器响应 */
    class VideoGetMoneyRet implements IVideoGetMoneyRet {

        /**
         * Constructs a new VideoGetMoneyRet.
         * @param [properties] Properties to set
         */
        constructor(properties?: IVideoGetMoneyRet);

        /** VideoGetMoneyRet balance. */
        public balance: Long;

        /** VideoGetMoneyRet balanceNull. */
        public balanceNull: Long;

        /** VideoGetMoneyRet totalBalance. */
        public totalBalance: Long;

        /** VideoGetMoneyRet totalBalanceNull. */
        public totalBalanceNull: Long;

        /** 看完视频后 获得xx金币 */
        public balanceOne?: ("balance"|"balanceNull");

        /** 总金币 */
        public totalBalanceOne?: ("totalBalance"|"totalBalanceNull");

        /**
         * Creates a new VideoGetMoneyRet instance using the specified properties.
         * @param [properties] Properties to set
         * @returns VideoGetMoneyRet instance
         */
        public static create(properties?: IVideoGetMoneyRet): VideoGetMoneyRet;

        /**
         * Encodes the specified VideoGetMoneyRet message. Does not implicitly {@link VideoGetMoneyRet.verify|verify} messages.
         * @param message VideoGetMoneyRet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: IVideoGetMoneyRet, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified VideoGetMoneyRet message, length delimited. Does not implicitly {@link VideoGetMoneyRet.verify|verify} messages.
         * @param message VideoGetMoneyRet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: IVideoGetMoneyRet, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a VideoGetMoneyRet message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns VideoGetMoneyRet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): VideoGetMoneyRet;

        /**
         * Decodes a VideoGetMoneyRet message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns VideoGetMoneyRet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): VideoGetMoneyRet;

        /**
         * Verifies a VideoGetMoneyRet message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a VideoGetMoneyRet message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns VideoGetMoneyRet
         */
        public static fromObject(object: { [k: string]: any }): VideoGetMoneyRet;

        /**
         * Creates a plain object from a VideoGetMoneyRet message. Also converts values to other types if specified.
         * @param message VideoGetMoneyRet
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: VideoGetMoneyRet, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this VideoGetMoneyRet to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a MarqueePush. */
    interface IMarqueePush {

        /** 消息 */
        mgs?: (IPushMessages[]|null);
    }

    /** 服务器推送跑马灯 */
    class MarqueePush implements IMarqueePush {

        /**
         * Constructs a new MarqueePush.
         * @param [properties] Properties to set
         */
        constructor(properties?: IMarqueePush);

        /** 消息 */
        public mgs: IPushMessages[];

        /**
         * Creates a new MarqueePush instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MarqueePush instance
         */
        public static create(properties?: IMarqueePush): MarqueePush;

        /**
         * Encodes the specified MarqueePush message. Does not implicitly {@link MarqueePush.verify|verify} messages.
         * @param message MarqueePush message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: IMarqueePush, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified MarqueePush message, length delimited. Does not implicitly {@link MarqueePush.verify|verify} messages.
         * @param message MarqueePush message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: IMarqueePush, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a MarqueePush message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MarqueePush
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): MarqueePush;

        /**
         * Decodes a MarqueePush message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MarqueePush
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): MarqueePush;

        /**
         * Verifies a MarqueePush message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a MarqueePush message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MarqueePush
         */
        public static fromObject(object: { [k: string]: any }): MarqueePush;

        /**
         * Creates a plain object from a MarqueePush message. Also converts values to other types if specified.
         * @param message MarqueePush
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: MarqueePush, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this MarqueePush to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a PushMessages. */
    interface IPushMessages {

        /** 用户id */
        userId?: (Long|null);

        /** 类型 */
        type?: (number|null);

        /** 内容 */
        content?: (string|null);

        /** 优先级 */
        priority?: (number|null);
    }

    /** 玩家消息 */
    class PushMessages implements IPushMessages {

        /**
         * Constructs a new PushMessages.
         * @param [properties] Properties to set
         */
        constructor(properties?: IPushMessages);

        /** 用户id */
        public userId: Long;

        /** 类型 */
        public type: number;

        /** 内容 */
        public content: string;

        /** 优先级 */
        public priority: number;

        /**
         * Creates a new PushMessages instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PushMessages instance
         */
        public static create(properties?: IPushMessages): PushMessages;

        /**
         * Encodes the specified PushMessages message. Does not implicitly {@link PushMessages.verify|verify} messages.
         * @param message PushMessages message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: IPushMessages, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PushMessages message, length delimited. Does not implicitly {@link PushMessages.verify|verify} messages.
         * @param message PushMessages message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: IPushMessages, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PushMessages message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PushMessages
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): PushMessages;

        /**
         * Decodes a PushMessages message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PushMessages
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): PushMessages;

        /**
         * Verifies a PushMessages message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PushMessages message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PushMessages
         */
        public static fromObject(object: { [k: string]: any }): PushMessages;

        /**
         * Creates a plain object from a PushMessages message. Also converts values to other types if specified.
         * @param message PushMessages
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: PushMessages, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PushMessages to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ZeroNoticePush. */
    interface IZeroNoticePush {
    }

    /** 零点通知 */
    class ZeroNoticePush implements IZeroNoticePush {

        /**
         * Constructs a new ZeroNoticePush.
         * @param [properties] Properties to set
         */
        constructor(properties?: IZeroNoticePush);

        /**
         * Creates a new ZeroNoticePush instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ZeroNoticePush instance
         */
        public static create(properties?: IZeroNoticePush): ZeroNoticePush;

        /**
         * Encodes the specified ZeroNoticePush message. Does not implicitly {@link ZeroNoticePush.verify|verify} messages.
         * @param message ZeroNoticePush message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: IZeroNoticePush, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ZeroNoticePush message, length delimited. Does not implicitly {@link ZeroNoticePush.verify|verify} messages.
         * @param message ZeroNoticePush message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: IZeroNoticePush, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ZeroNoticePush message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ZeroNoticePush
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ZeroNoticePush;

        /**
         * Decodes a ZeroNoticePush message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ZeroNoticePush
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ZeroNoticePush;

        /**
         * Verifies a ZeroNoticePush message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ZeroNoticePush message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ZeroNoticePush
         */
        public static fromObject(object: { [k: string]: any }): ZeroNoticePush;

        /**
         * Creates a plain object from a ZeroNoticePush message. Also converts values to other types if specified.
         * @param message ZeroNoticePush
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: ZeroNoticePush, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ZeroNoticePush to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a NoviceBagSaveReq. */
    interface INoviceBagSaveReq {
    }

    /** 前端请求 点击新手礼包调用 */
    class NoviceBagSaveReq implements INoviceBagSaveReq {

        /**
         * Constructs a new NoviceBagSaveReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: INoviceBagSaveReq);

        /**
         * Creates a new NoviceBagSaveReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns NoviceBagSaveReq instance
         */
        public static create(properties?: INoviceBagSaveReq): NoviceBagSaveReq;

        /**
         * Encodes the specified NoviceBagSaveReq message. Does not implicitly {@link NoviceBagSaveReq.verify|verify} messages.
         * @param message NoviceBagSaveReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: INoviceBagSaveReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified NoviceBagSaveReq message, length delimited. Does not implicitly {@link NoviceBagSaveReq.verify|verify} messages.
         * @param message NoviceBagSaveReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: INoviceBagSaveReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a NoviceBagSaveReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns NoviceBagSaveReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): NoviceBagSaveReq;

        /**
         * Decodes a NoviceBagSaveReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns NoviceBagSaveReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): NoviceBagSaveReq;

        /**
         * Verifies a NoviceBagSaveReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a NoviceBagSaveReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns NoviceBagSaveReq
         */
        public static fromObject(object: { [k: string]: any }): NoviceBagSaveReq;

        /**
         * Creates a plain object from a NoviceBagSaveReq message. Also converts values to other types if specified.
         * @param message NoviceBagSaveReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: NoviceBagSaveReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this NoviceBagSaveReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a NoviceBagSaveRet. */
    interface INoviceBagSaveRet {

        /** 返回的金币 */
        goldReceive?: (IGoldReceive|null);

        /** 返回的红包 */
        redBagReceive?: (IRedBagReceive|null);
    }

    /** 服务器响应 */
    class NoviceBagSaveRet implements INoviceBagSaveRet {

        /**
         * Constructs a new NoviceBagSaveRet.
         * @param [properties] Properties to set
         */
        constructor(properties?: INoviceBagSaveRet);

        /** 返回的金币 */
        public goldReceive?: (IGoldReceive|null);

        /** 返回的红包 */
        public redBagReceive?: (IRedBagReceive|null);

        /**
         * Creates a new NoviceBagSaveRet instance using the specified properties.
         * @param [properties] Properties to set
         * @returns NoviceBagSaveRet instance
         */
        public static create(properties?: INoviceBagSaveRet): NoviceBagSaveRet;

        /**
         * Encodes the specified NoviceBagSaveRet message. Does not implicitly {@link NoviceBagSaveRet.verify|verify} messages.
         * @param message NoviceBagSaveRet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: INoviceBagSaveRet, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified NoviceBagSaveRet message, length delimited. Does not implicitly {@link NoviceBagSaveRet.verify|verify} messages.
         * @param message NoviceBagSaveRet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: INoviceBagSaveRet, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a NoviceBagSaveRet message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns NoviceBagSaveRet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): NoviceBagSaveRet;

        /**
         * Decodes a NoviceBagSaveRet message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns NoviceBagSaveRet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): NoviceBagSaveRet;

        /**
         * Verifies a NoviceBagSaveRet message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a NoviceBagSaveRet message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns NoviceBagSaveRet
         */
        public static fromObject(object: { [k: string]: any }): NoviceBagSaveRet;

        /**
         * Creates a plain object from a NoviceBagSaveRet message. Also converts values to other types if specified.
         * @param message NoviceBagSaveRet
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: NoviceBagSaveRet, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this NoviceBagSaveRet to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GoldReceive. */
    interface IGoldReceive {

        /** 类型 */
        type?: (number|null);

        /** GoldReceive gold */
        gold?: (Long|null);

        /** GoldReceive goldNull */
        goldNull?: (Long|null);

        /** GoldReceive totalGold */
        totalGold?: (Long|null);

        /** GoldReceive totalGoldNull */
        totalGoldNull?: (Long|null);
    }

    /** 返回的金币 */
    class GoldReceive implements IGoldReceive {

        /**
         * Constructs a new GoldReceive.
         * @param [properties] Properties to set
         */
        constructor(properties?: IGoldReceive);

        /** 类型 */
        public type: number;

        /** GoldReceive gold. */
        public gold: Long;

        /** GoldReceive goldNull. */
        public goldNull: Long;

        /** GoldReceive totalGold. */
        public totalGold: Long;

        /** GoldReceive totalGoldNull. */
        public totalGoldNull: Long;

        /** 金币 */
        public goldOne?: ("gold"|"goldNull");

        /** 总金币 */
        public totalGoldOne?: ("totalGold"|"totalGoldNull");

        /**
         * Creates a new GoldReceive instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GoldReceive instance
         */
        public static create(properties?: IGoldReceive): GoldReceive;

        /**
         * Encodes the specified GoldReceive message. Does not implicitly {@link GoldReceive.verify|verify} messages.
         * @param message GoldReceive message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: IGoldReceive, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GoldReceive message, length delimited. Does not implicitly {@link GoldReceive.verify|verify} messages.
         * @param message GoldReceive message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: IGoldReceive, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GoldReceive message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GoldReceive
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): GoldReceive;

        /**
         * Decodes a GoldReceive message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GoldReceive
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): GoldReceive;

        /**
         * Verifies a GoldReceive message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GoldReceive message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GoldReceive
         */
        public static fromObject(object: { [k: string]: any }): GoldReceive;

        /**
         * Creates a plain object from a GoldReceive message. Also converts values to other types if specified.
         * @param message GoldReceive
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: GoldReceive, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GoldReceive to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RedBagReceive. */
    interface IRedBagReceive {

        /** 类型 */
        type?: (number|null);

        /** RedBagReceive redBag */
        redBag?: (Long|null);

        /** RedBagReceive redBagNull */
        redBagNull?: (Long|null);

        /** RedBagReceive totalRedBag */
        totalRedBag?: (Long|null);

        /** RedBagReceive totalRedBagNull */
        totalRedBagNull?: (Long|null);
    }

    /** 返回的红包 */
    class RedBagReceive implements IRedBagReceive {

        /**
         * Constructs a new RedBagReceive.
         * @param [properties] Properties to set
         */
        constructor(properties?: IRedBagReceive);

        /** 类型 */
        public type: number;

        /** RedBagReceive redBag. */
        public redBag: Long;

        /** RedBagReceive redBagNull. */
        public redBagNull: Long;

        /** RedBagReceive totalRedBag. */
        public totalRedBag: Long;

        /** RedBagReceive totalRedBagNull. */
        public totalRedBagNull: Long;

        /** 红包 */
        public redBagOne?: ("redBag"|"redBagNull");

        /** 总红包 */
        public totalRedBagOne?: ("totalRedBag"|"totalRedBagNull");

        /**
         * Creates a new RedBagReceive instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RedBagReceive instance
         */
        public static create(properties?: IRedBagReceive): RedBagReceive;

        /**
         * Encodes the specified RedBagReceive message. Does not implicitly {@link RedBagReceive.verify|verify} messages.
         * @param message RedBagReceive message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: IRedBagReceive, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RedBagReceive message, length delimited. Does not implicitly {@link RedBagReceive.verify|verify} messages.
         * @param message RedBagReceive message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: IRedBagReceive, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RedBagReceive message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RedBagReceive
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): RedBagReceive;

        /**
         * Decodes a RedBagReceive message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RedBagReceive
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): RedBagReceive;

        /**
         * Verifies a RedBagReceive message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RedBagReceive message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RedBagReceive
         */
        public static fromObject(object: { [k: string]: any }): RedBagReceive;

        /**
         * Creates a plain object from a RedBagReceive message. Also converts values to other types if specified.
         * @param message RedBagReceive
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: RedBagReceive, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RedBagReceive to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a SignInReq. */
    interface ISignInReq {
    }

    /** 前端请求 签到 */
    class SignInReq implements ISignInReq {

        /**
         * Constructs a new SignInReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: ISignInReq);

        /**
         * Creates a new SignInReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SignInReq instance
         */
        public static create(properties?: ISignInReq): SignInReq;

        /**
         * Encodes the specified SignInReq message. Does not implicitly {@link SignInReq.verify|verify} messages.
         * @param message SignInReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: ISignInReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SignInReq message, length delimited. Does not implicitly {@link SignInReq.verify|verify} messages.
         * @param message SignInReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: ISignInReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SignInReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SignInReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SignInReq;

        /**
         * Decodes a SignInReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SignInReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SignInReq;

        /**
         * Verifies a SignInReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SignInReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SignInReq
         */
        public static fromObject(object: { [k: string]: any }): SignInReq;

        /**
         * Creates a plain object from a SignInReq message. Also converts values to other types if specified.
         * @param message SignInReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: SignInReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SignInReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a SignInRet. */
    interface ISignInRet {

        /** 天 详情 */
        dDetails?: (IDailyDetails[]|null);

        /** SignInRet currentDay */
        currentDay?: (number|null);

        /** SignInRet currentDayNull */
        currentDayNull?: (number|null);
    }

    /** 服务器响应 */
    class SignInRet implements ISignInRet {

        /**
         * Constructs a new SignInRet.
         * @param [properties] Properties to set
         */
        constructor(properties?: ISignInRet);

        /** 天 详情 */
        public dDetails: IDailyDetails[];

        /** SignInRet currentDay. */
        public currentDay: number;

        /** SignInRet currentDayNull. */
        public currentDayNull: number;

        /** 当前是第几天 */
        public currentDayOne?: ("currentDay"|"currentDayNull");

        /**
         * Creates a new SignInRet instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SignInRet instance
         */
        public static create(properties?: ISignInRet): SignInRet;

        /**
         * Encodes the specified SignInRet message. Does not implicitly {@link SignInRet.verify|verify} messages.
         * @param message SignInRet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: ISignInRet, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SignInRet message, length delimited. Does not implicitly {@link SignInRet.verify|verify} messages.
         * @param message SignInRet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: ISignInRet, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SignInRet message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SignInRet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SignInRet;

        /**
         * Decodes a SignInRet message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SignInRet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SignInRet;

        /**
         * Verifies a SignInRet message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SignInRet message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SignInRet
         */
        public static fromObject(object: { [k: string]: any }): SignInRet;

        /**
         * Creates a plain object from a SignInRet message. Also converts values to other types if specified.
         * @param message SignInRet
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: SignInRet, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SignInRet to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a DailyDetails. */
    interface IDailyDetails {

        /** DailyDetails dayNum */
        dayNum?: (number|null);

        /** DailyDetails dayNumNull */
        dayNumNull?: (number|null);

        /** DailyDetails gold */
        gold?: (Long|null);

        /** DailyDetails goldNull */
        goldNull?: (Long|null);

        /** DailyDetails redBag */
        redBag?: (Long|null);

        /** DailyDetails redBagNull */
        redBagNull?: (Long|null);

        /** DailyDetails status */
        status?: (number|null);

        /** DailyDetails statusNull */
        statusNull?: (number|null);
    }

    /** 每天详情 */
    class DailyDetails implements IDailyDetails {

        /**
         * Constructs a new DailyDetails.
         * @param [properties] Properties to set
         */
        constructor(properties?: IDailyDetails);

        /** DailyDetails dayNum. */
        public dayNum: number;

        /** DailyDetails dayNumNull. */
        public dayNumNull: number;

        /** DailyDetails gold. */
        public gold: Long;

        /** DailyDetails goldNull. */
        public goldNull: Long;

        /** DailyDetails redBag. */
        public redBag: Long;

        /** DailyDetails redBagNull. */
        public redBagNull: Long;

        /** DailyDetails status. */
        public status: number;

        /** DailyDetails statusNull. */
        public statusNull: number;

        /** 第几天 */
        public dayNumOne?: ("dayNum"|"dayNumNull");

        /** 金币 */
        public goldOne?: ("gold"|"goldNull");

        /** 红包 */
        public redBagOne?: ("redBag"|"redBagNull");

        /** 领取状态(0可领取 1不可领取 2已领取) */
        public statusOne?: ("status"|"statusNull");

        /**
         * Creates a new DailyDetails instance using the specified properties.
         * @param [properties] Properties to set
         * @returns DailyDetails instance
         */
        public static create(properties?: IDailyDetails): DailyDetails;

        /**
         * Encodes the specified DailyDetails message. Does not implicitly {@link DailyDetails.verify|verify} messages.
         * @param message DailyDetails message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: IDailyDetails, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified DailyDetails message, length delimited. Does not implicitly {@link DailyDetails.verify|verify} messages.
         * @param message DailyDetails message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: IDailyDetails, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a DailyDetails message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns DailyDetails
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): DailyDetails;

        /**
         * Decodes a DailyDetails message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns DailyDetails
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): DailyDetails;

        /**
         * Verifies a DailyDetails message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a DailyDetails message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns DailyDetails
         */
        public static fromObject(object: { [k: string]: any }): DailyDetails;

        /**
         * Creates a plain object from a DailyDetails message. Also converts values to other types if specified.
         * @param message DailyDetails
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: DailyDetails, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this DailyDetails to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a SignInReceiveReq. */
    interface ISignInReceiveReq {
    }

    /** 前端请求 签到-领取 */
    class SignInReceiveReq implements ISignInReceiveReq {

        /**
         * Constructs a new SignInReceiveReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: ISignInReceiveReq);

        /**
         * Creates a new SignInReceiveReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SignInReceiveReq instance
         */
        public static create(properties?: ISignInReceiveReq): SignInReceiveReq;

        /**
         * Encodes the specified SignInReceiveReq message. Does not implicitly {@link SignInReceiveReq.verify|verify} messages.
         * @param message SignInReceiveReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: ISignInReceiveReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SignInReceiveReq message, length delimited. Does not implicitly {@link SignInReceiveReq.verify|verify} messages.
         * @param message SignInReceiveReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: ISignInReceiveReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SignInReceiveReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SignInReceiveReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SignInReceiveReq;

        /**
         * Decodes a SignInReceiveReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SignInReceiveReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SignInReceiveReq;

        /**
         * Verifies a SignInReceiveReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SignInReceiveReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SignInReceiveReq
         */
        public static fromObject(object: { [k: string]: any }): SignInReceiveReq;

        /**
         * Creates a plain object from a SignInReceiveReq message. Also converts values to other types if specified.
         * @param message SignInReceiveReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: SignInReceiveReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SignInReceiveReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a SignInReceiveRet. */
    interface ISignInReceiveRet {

        /** SignInReceiveRet gold */
        gold?: (Long|null);

        /** SignInReceiveRet goldNull */
        goldNull?: (Long|null);

        /** SignInReceiveRet redBag */
        redBag?: (Long|null);

        /** SignInReceiveRet redBagNull */
        redBagNull?: (Long|null);

        /** SignInReceiveRet currentDay */
        currentDay?: (number|null);

        /** SignInReceiveRet currentDayNull */
        currentDayNull?: (number|null);

        /** SignInReceiveRet totalGold */
        totalGold?: (Long|null);

        /** SignInReceiveRet totalGoldNull */
        totalGoldNull?: (Long|null);

        /** SignInReceiveRet totalRedBag */
        totalRedBag?: (Long|null);

        /** SignInReceiveRet totalRedBagNull */
        totalRedBagNull?: (Long|null);
    }

    /** 服务器响应 */
    class SignInReceiveRet implements ISignInReceiveRet {

        /**
         * Constructs a new SignInReceiveRet.
         * @param [properties] Properties to set
         */
        constructor(properties?: ISignInReceiveRet);

        /** SignInReceiveRet gold. */
        public gold: Long;

        /** SignInReceiveRet goldNull. */
        public goldNull: Long;

        /** SignInReceiveRet redBag. */
        public redBag: Long;

        /** SignInReceiveRet redBagNull. */
        public redBagNull: Long;

        /** SignInReceiveRet currentDay. */
        public currentDay: number;

        /** SignInReceiveRet currentDayNull. */
        public currentDayNull: number;

        /** SignInReceiveRet totalGold. */
        public totalGold: Long;

        /** SignInReceiveRet totalGoldNull. */
        public totalGoldNull: Long;

        /** SignInReceiveRet totalRedBag. */
        public totalRedBag: Long;

        /** SignInReceiveRet totalRedBagNull. */
        public totalRedBagNull: Long;

        /** 金币 */
        public goldOne?: ("gold"|"goldNull");

        /** 红包 */
        public redBagOne?: ("redBag"|"redBagNull");

        /** 当前是第几天 */
        public currentDayOne?: ("currentDay"|"currentDayNull");

        /** 总金币 */
        public totalGoldOne?: ("totalGold"|"totalGoldNull");

        /** 总红包 */
        public totalRedBagOne?: ("totalRedBag"|"totalRedBagNull");

        /**
         * Creates a new SignInReceiveRet instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SignInReceiveRet instance
         */
        public static create(properties?: ISignInReceiveRet): SignInReceiveRet;

        /**
         * Encodes the specified SignInReceiveRet message. Does not implicitly {@link SignInReceiveRet.verify|verify} messages.
         * @param message SignInReceiveRet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: ISignInReceiveRet, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SignInReceiveRet message, length delimited. Does not implicitly {@link SignInReceiveRet.verify|verify} messages.
         * @param message SignInReceiveRet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: ISignInReceiveRet, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SignInReceiveRet message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SignInReceiveRet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SignInReceiveRet;

        /**
         * Decodes a SignInReceiveRet message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SignInReceiveRet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SignInReceiveRet;

        /**
         * Verifies a SignInReceiveRet message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SignInReceiveRet message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SignInReceiveRet
         */
        public static fromObject(object: { [k: string]: any }): SignInReceiveRet;

        /**
         * Creates a plain object from a SignInReceiveRet message. Also converts values to other types if specified.
         * @param message SignInReceiveRet
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: SignInReceiveRet, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SignInReceiveRet to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CollectMoneyReq. */
    interface ICollectMoneyReq {
    }

    /** 前端请求 收金币 */
    class CollectMoneyReq implements ICollectMoneyReq {

        /**
         * Constructs a new CollectMoneyReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: ICollectMoneyReq);

        /**
         * Creates a new CollectMoneyReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CollectMoneyReq instance
         */
        public static create(properties?: ICollectMoneyReq): CollectMoneyReq;

        /**
         * Encodes the specified CollectMoneyReq message. Does not implicitly {@link CollectMoneyReq.verify|verify} messages.
         * @param message CollectMoneyReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: ICollectMoneyReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CollectMoneyReq message, length delimited. Does not implicitly {@link CollectMoneyReq.verify|verify} messages.
         * @param message CollectMoneyReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: ICollectMoneyReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CollectMoneyReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CollectMoneyReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CollectMoneyReq;

        /**
         * Decodes a CollectMoneyReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CollectMoneyReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CollectMoneyReq;

        /**
         * Verifies a CollectMoneyReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CollectMoneyReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CollectMoneyReq
         */
        public static fromObject(object: { [k: string]: any }): CollectMoneyReq;

        /**
         * Creates a plain object from a CollectMoneyReq message. Also converts values to other types if specified.
         * @param message CollectMoneyReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: CollectMoneyReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CollectMoneyReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CollectMoneyRet. */
    interface ICollectMoneyRet {

        /** 当前收了多少钱 */
        collectMoney?: (Long|null);

        /** 当前金币 */
        currentMoney?: (Long|null);

        /** 上限金币 */
        upperLimit?: (number|null);
    }

    /** 服务器响应 */
    class CollectMoneyRet implements ICollectMoneyRet {

        /**
         * Constructs a new CollectMoneyRet.
         * @param [properties] Properties to set
         */
        constructor(properties?: ICollectMoneyRet);

        /** 当前收了多少钱 */
        public collectMoney: Long;

        /** 当前金币 */
        public currentMoney: Long;

        /** 上限金币 */
        public upperLimit: number;

        /**
         * Creates a new CollectMoneyRet instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CollectMoneyRet instance
         */
        public static create(properties?: ICollectMoneyRet): CollectMoneyRet;

        /**
         * Encodes the specified CollectMoneyRet message. Does not implicitly {@link CollectMoneyRet.verify|verify} messages.
         * @param message CollectMoneyRet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: ICollectMoneyRet, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CollectMoneyRet message, length delimited. Does not implicitly {@link CollectMoneyRet.verify|verify} messages.
         * @param message CollectMoneyRet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: ICollectMoneyRet, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CollectMoneyRet message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CollectMoneyRet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CollectMoneyRet;

        /**
         * Decodes a CollectMoneyRet message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CollectMoneyRet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CollectMoneyRet;

        /**
         * Verifies a CollectMoneyRet message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CollectMoneyRet message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CollectMoneyRet
         */
        public static fromObject(object: { [k: string]: any }): CollectMoneyRet;

        /**
         * Creates a plain object from a CollectMoneyRet message. Also converts values to other types if specified.
         * @param message CollectMoneyRet
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: CollectMoneyRet, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CollectMoneyRet to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an AccelerateReq. */
    interface IAccelerateReq {
    }

    /** 前端请求 加速 */
    class AccelerateReq implements IAccelerateReq {

        /**
         * Constructs a new AccelerateReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: IAccelerateReq);

        /**
         * Creates a new AccelerateReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AccelerateReq instance
         */
        public static create(properties?: IAccelerateReq): AccelerateReq;

        /**
         * Encodes the specified AccelerateReq message. Does not implicitly {@link AccelerateReq.verify|verify} messages.
         * @param message AccelerateReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: IAccelerateReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AccelerateReq message, length delimited. Does not implicitly {@link AccelerateReq.verify|verify} messages.
         * @param message AccelerateReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: IAccelerateReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AccelerateReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AccelerateReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AccelerateReq;

        /**
         * Decodes an AccelerateReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns AccelerateReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AccelerateReq;

        /**
         * Verifies an AccelerateReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AccelerateReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AccelerateReq
         */
        public static fromObject(object: { [k: string]: any }): AccelerateReq;

        /**
         * Creates a plain object from an AccelerateReq message. Also converts values to other types if specified.
         * @param message AccelerateReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AccelerateReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AccelerateReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an AccelerateRet. */
    interface IAccelerateRet {

        /** 加速倍数 */
        advUpDouble?: (number|null);

        /** 加速持续时间（秒） */
        advUpTime?: (number|null);

        /** 加速次数 */
        accelerateNumber?: (number|null);

        /** AccelerateRet accelerateNumberNull */
        accelerateNumberNull?: (number|null);
    }

    /** 服务器响应 */
    class AccelerateRet implements IAccelerateRet {

        /**
         * Constructs a new AccelerateRet.
         * @param [properties] Properties to set
         */
        constructor(properties?: IAccelerateRet);

        /** 加速倍数 */
        public advUpDouble: number;

        /** 加速持续时间（秒） */
        public advUpTime: number;

        /** 加速次数 */
        public accelerateNumber: number;

        /** AccelerateRet accelerateNumberNull. */
        public accelerateNumberNull: number;

        /** AccelerateRet ccelerateNumberOne. */
        public ccelerateNumberOne?: ("accelerateNumber"|"accelerateNumberNull");

        /**
         * Creates a new AccelerateRet instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AccelerateRet instance
         */
        public static create(properties?: IAccelerateRet): AccelerateRet;

        /**
         * Encodes the specified AccelerateRet message. Does not implicitly {@link AccelerateRet.verify|verify} messages.
         * @param message AccelerateRet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: IAccelerateRet, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AccelerateRet message, length delimited. Does not implicitly {@link AccelerateRet.verify|verify} messages.
         * @param message AccelerateRet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: IAccelerateRet, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AccelerateRet message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AccelerateRet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AccelerateRet;

        /**
         * Decodes an AccelerateRet message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns AccelerateRet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AccelerateRet;

        /**
         * Verifies an AccelerateRet message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AccelerateRet message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AccelerateRet
         */
        public static fromObject(object: { [k: string]: any }): AccelerateRet;

        /**
         * Creates a plain object from an AccelerateRet message. Also converts values to other types if specified.
         * @param message AccelerateRet
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: AccelerateRet, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AccelerateRet to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an UpgradeReq. */
    interface IUpgradeReq {
    }

    /** 前端请求 升级摊位 */
    class UpgradeReq implements IUpgradeReq {

        /**
         * Constructs a new UpgradeReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: IUpgradeReq);

        /**
         * Creates a new UpgradeReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns UpgradeReq instance
         */
        public static create(properties?: IUpgradeReq): UpgradeReq;

        /**
         * Encodes the specified UpgradeReq message. Does not implicitly {@link UpgradeReq.verify|verify} messages.
         * @param message UpgradeReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: IUpgradeReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified UpgradeReq message, length delimited. Does not implicitly {@link UpgradeReq.verify|verify} messages.
         * @param message UpgradeReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: IUpgradeReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an UpgradeReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns UpgradeReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): UpgradeReq;

        /**
         * Decodes an UpgradeReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns UpgradeReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): UpgradeReq;

        /**
         * Verifies an UpgradeReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an UpgradeReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns UpgradeReq
         */
        public static fromObject(object: { [k: string]: any }): UpgradeReq;

        /**
         * Creates a plain object from an UpgradeReq message. Also converts values to other types if specified.
         * @param message UpgradeReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: UpgradeReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this UpgradeReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an UpgradeRet. */
    interface IUpgradeRet {

        /** 升级送的金币 */
        gold?: (Long|null);

        /** 升级送的红包 0 :没有红包 ,1 有红包 */
        redBak?: (Long|null);

        /** 升级送的抽奖次数 */
        luckyCount?: (number|null);

        /** 上限 */
        upperLimit?: (Long|null);

        /** 当前金币 */
        currentMoney?: (Long|null);

        /** 下一级需要金币 */
        nextLevelMoney?: (Long|null);

        /** 摊位信息(一个) */
        stallInfo?: (IStallInfo|null);

        /** 等级产出/秒 */
        outputs?: (number|null);

        /** 当前可收入金币 */
        currentIncom?: (Long|null);

        /** 等级 */
        level?: (number|null);

        /** 状态 1:可领取 2：不可领取 */
        gradeStatus?: (number|null);

        /** UpgradeRet gradeStatusNull */
        gradeStatusNull?: (number|null);
    }

    /** 服务器响应 */
    class UpgradeRet implements IUpgradeRet {

        /**
         * Constructs a new UpgradeRet.
         * @param [properties] Properties to set
         */
        constructor(properties?: IUpgradeRet);

        /** 升级送的金币 */
        public gold: Long;

        /** 升级送的红包 0 :没有红包 ,1 有红包 */
        public redBak: Long;

        /** 升级送的抽奖次数 */
        public luckyCount: number;

        /** 上限 */
        public upperLimit: Long;

        /** 当前金币 */
        public currentMoney: Long;

        /** 下一级需要金币 */
        public nextLevelMoney: Long;

        /** 摊位信息(一个) */
        public stallInfo?: (IStallInfo|null);

        /** 等级产出/秒 */
        public outputs: number;

        /** 当前可收入金币 */
        public currentIncom: Long;

        /** 等级 */
        public level: number;

        /** 状态 1:可领取 2：不可领取 */
        public gradeStatus: number;

        /** UpgradeRet gradeStatusNull. */
        public gradeStatusNull: number;

        /** UpgradeRet levelRewardOne. */
        public levelRewardOne?: ("gradeStatus"|"gradeStatusNull");

        /**
         * Creates a new UpgradeRet instance using the specified properties.
         * @param [properties] Properties to set
         * @returns UpgradeRet instance
         */
        public static create(properties?: IUpgradeRet): UpgradeRet;

        /**
         * Encodes the specified UpgradeRet message. Does not implicitly {@link UpgradeRet.verify|verify} messages.
         * @param message UpgradeRet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: IUpgradeRet, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified UpgradeRet message, length delimited. Does not implicitly {@link UpgradeRet.verify|verify} messages.
         * @param message UpgradeRet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: IUpgradeRet, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an UpgradeRet message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns UpgradeRet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): UpgradeRet;

        /**
         * Decodes an UpgradeRet message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns UpgradeRet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): UpgradeRet;

        /**
         * Verifies an UpgradeRet message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an UpgradeRet message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns UpgradeRet
         */
        public static fromObject(object: { [k: string]: any }): UpgradeRet;

        /**
         * Creates a plain object from an UpgradeRet message. Also converts values to other types if specified.
         * @param message UpgradeRet
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: UpgradeRet, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this UpgradeRet to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a StallGoldReq. */
    interface IStallGoldReq {

        /** 类型  1: 离线金币双倍,2: 升级金币双倍 ,3: 升级金币不足 */
        type?: (number|null);
    }

    /** 摊位金币双倍接口 */
    class StallGoldReq implements IStallGoldReq {

        /**
         * Constructs a new StallGoldReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: IStallGoldReq);

        /** 类型  1: 离线金币双倍,2: 升级金币双倍 ,3: 升级金币不足 */
        public type: number;

        /**
         * Creates a new StallGoldReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns StallGoldReq instance
         */
        public static create(properties?: IStallGoldReq): StallGoldReq;

        /**
         * Encodes the specified StallGoldReq message. Does not implicitly {@link StallGoldReq.verify|verify} messages.
         * @param message StallGoldReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: IStallGoldReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified StallGoldReq message, length delimited. Does not implicitly {@link StallGoldReq.verify|verify} messages.
         * @param message StallGoldReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: IStallGoldReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a StallGoldReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns StallGoldReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): StallGoldReq;

        /**
         * Decodes a StallGoldReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns StallGoldReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): StallGoldReq;

        /**
         * Verifies a StallGoldReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a StallGoldReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns StallGoldReq
         */
        public static fromObject(object: { [k: string]: any }): StallGoldReq;

        /**
         * Creates a plain object from a StallGoldReq message. Also converts values to other types if specified.
         * @param message StallGoldReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: StallGoldReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this StallGoldReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a StallGoldRet. */
    interface IStallGoldRet {

        /** 金币 */
        gold?: (Long|null);

        /** StallGoldRet goldNull */
        goldNull?: (Long|null);

        /** 摊位总金币 */
        totalGold?: (Long|null);

        /** StallGoldRet totalGoldNull */
        totalGoldNull?: (Long|null);

        /** 视频双倍剩余次数 */
        videoNumber?: (number|null);

        /** StallGoldRet videoNumberNull */
        videoNumberNull?: (number|null);
    }

    /** 摊位金币 */
    class StallGoldRet implements IStallGoldRet {

        /**
         * Constructs a new StallGoldRet.
         * @param [properties] Properties to set
         */
        constructor(properties?: IStallGoldRet);

        /** 金币 */
        public gold: Long;

        /** StallGoldRet goldNull. */
        public goldNull: Long;

        /** 摊位总金币 */
        public totalGold: Long;

        /** StallGoldRet totalGoldNull. */
        public totalGoldNull: Long;

        /** 视频双倍剩余次数 */
        public videoNumber: number;

        /** StallGoldRet videoNumberNull. */
        public videoNumberNull: number;

        /** StallGoldRet goldOne. */
        public goldOne?: ("gold"|"goldNull");

        /** StallGoldRet totalGoldOne. */
        public totalGoldOne?: ("totalGold"|"totalGoldNull");

        /** StallGoldRet videoNumberOne. */
        public videoNumberOne?: ("videoNumber"|"videoNumberNull");

        /**
         * Creates a new StallGoldRet instance using the specified properties.
         * @param [properties] Properties to set
         * @returns StallGoldRet instance
         */
        public static create(properties?: IStallGoldRet): StallGoldRet;

        /**
         * Encodes the specified StallGoldRet message. Does not implicitly {@link StallGoldRet.verify|verify} messages.
         * @param message StallGoldRet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: IStallGoldRet, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified StallGoldRet message, length delimited. Does not implicitly {@link StallGoldRet.verify|verify} messages.
         * @param message StallGoldRet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: IStallGoldRet, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a StallGoldRet message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns StallGoldRet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): StallGoldRet;

        /**
         * Decodes a StallGoldRet message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns StallGoldRet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): StallGoldRet;

        /**
         * Verifies a StallGoldRet message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a StallGoldRet message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns StallGoldRet
         */
        public static fromObject(object: { [k: string]: any }): StallGoldRet;

        /**
         * Creates a plain object from a StallGoldRet message. Also converts values to other types if specified.
         * @param message StallGoldRet
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: StallGoldRet, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this StallGoldRet to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an UpgradeRedEnvelopeReq. */
    interface IUpgradeRedEnvelopeReq {
    }

    /** 摊位升级红包 */
    class UpgradeRedEnvelopeReq implements IUpgradeRedEnvelopeReq {

        /**
         * Constructs a new UpgradeRedEnvelopeReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: IUpgradeRedEnvelopeReq);

        /**
         * Creates a new UpgradeRedEnvelopeReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns UpgradeRedEnvelopeReq instance
         */
        public static create(properties?: IUpgradeRedEnvelopeReq): UpgradeRedEnvelopeReq;

        /**
         * Encodes the specified UpgradeRedEnvelopeReq message. Does not implicitly {@link UpgradeRedEnvelopeReq.verify|verify} messages.
         * @param message UpgradeRedEnvelopeReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: IUpgradeRedEnvelopeReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified UpgradeRedEnvelopeReq message, length delimited. Does not implicitly {@link UpgradeRedEnvelopeReq.verify|verify} messages.
         * @param message UpgradeRedEnvelopeReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: IUpgradeRedEnvelopeReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an UpgradeRedEnvelopeReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns UpgradeRedEnvelopeReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): UpgradeRedEnvelopeReq;

        /**
         * Decodes an UpgradeRedEnvelopeReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns UpgradeRedEnvelopeReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): UpgradeRedEnvelopeReq;

        /**
         * Verifies an UpgradeRedEnvelopeReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an UpgradeRedEnvelopeReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns UpgradeRedEnvelopeReq
         */
        public static fromObject(object: { [k: string]: any }): UpgradeRedEnvelopeReq;

        /**
         * Creates a plain object from an UpgradeRedEnvelopeReq message. Also converts values to other types if specified.
         * @param message UpgradeRedEnvelopeReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: UpgradeRedEnvelopeReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this UpgradeRedEnvelopeReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an UpgradeRedEnvelopeRet. */
    interface IUpgradeRedEnvelopeRet {

        /** 红包 */
        redEnvelope?: (Long|null);

        /** UpgradeRedEnvelopeRet redEnvelopeNull */
        redEnvelopeNull?: (Long|null);

        /** 红包总数 */
        totalRedEnvelope?: (Long|null);

        /** UpgradeRedEnvelopeRet totalRedEnvelopeNull */
        totalRedEnvelopeNull?: (Long|null);
    }

    /** 摊位升级红包 */
    class UpgradeRedEnvelopeRet implements IUpgradeRedEnvelopeRet {

        /**
         * Constructs a new UpgradeRedEnvelopeRet.
         * @param [properties] Properties to set
         */
        constructor(properties?: IUpgradeRedEnvelopeRet);

        /** 红包 */
        public redEnvelope: Long;

        /** UpgradeRedEnvelopeRet redEnvelopeNull. */
        public redEnvelopeNull: Long;

        /** 红包总数 */
        public totalRedEnvelope: Long;

        /** UpgradeRedEnvelopeRet totalRedEnvelopeNull. */
        public totalRedEnvelopeNull: Long;

        /** UpgradeRedEnvelopeRet redEnvelopeOne. */
        public redEnvelopeOne?: ("redEnvelope"|"redEnvelopeNull");

        /** UpgradeRedEnvelopeRet totalRedEnvelopeOne. */
        public totalRedEnvelopeOne?: ("totalRedEnvelope"|"totalRedEnvelopeNull");

        /**
         * Creates a new UpgradeRedEnvelopeRet instance using the specified properties.
         * @param [properties] Properties to set
         * @returns UpgradeRedEnvelopeRet instance
         */
        public static create(properties?: IUpgradeRedEnvelopeRet): UpgradeRedEnvelopeRet;

        /**
         * Encodes the specified UpgradeRedEnvelopeRet message. Does not implicitly {@link UpgradeRedEnvelopeRet.verify|verify} messages.
         * @param message UpgradeRedEnvelopeRet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: IUpgradeRedEnvelopeRet, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified UpgradeRedEnvelopeRet message, length delimited. Does not implicitly {@link UpgradeRedEnvelopeRet.verify|verify} messages.
         * @param message UpgradeRedEnvelopeRet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: IUpgradeRedEnvelopeRet, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an UpgradeRedEnvelopeRet message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns UpgradeRedEnvelopeRet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): UpgradeRedEnvelopeRet;

        /**
         * Decodes an UpgradeRedEnvelopeRet message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns UpgradeRedEnvelopeRet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): UpgradeRedEnvelopeRet;

        /**
         * Verifies an UpgradeRedEnvelopeRet message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an UpgradeRedEnvelopeRet message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns UpgradeRedEnvelopeRet
         */
        public static fromObject(object: { [k: string]: any }): UpgradeRedEnvelopeRet;

        /**
         * Creates a plain object from an UpgradeRedEnvelopeRet message. Also converts values to other types if specified.
         * @param message UpgradeRedEnvelopeRet
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: UpgradeRedEnvelopeRet, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this UpgradeRedEnvelopeRet to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an UnReadPush. */
    interface IUnReadPush {

        /** 未阅读的功能 1: 签到, 2: 每日任务 */
        unreads?: (number[]|null);
    }

    /** 小红点推送 */
    class UnReadPush implements IUnReadPush {

        /**
         * Constructs a new UnReadPush.
         * @param [properties] Properties to set
         */
        constructor(properties?: IUnReadPush);

        /** 未阅读的功能 1: 签到, 2: 每日任务 */
        public unreads: number[];

        /**
         * Creates a new UnReadPush instance using the specified properties.
         * @param [properties] Properties to set
         * @returns UnReadPush instance
         */
        public static create(properties?: IUnReadPush): UnReadPush;

        /**
         * Encodes the specified UnReadPush message. Does not implicitly {@link UnReadPush.verify|verify} messages.
         * @param message UnReadPush message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: IUnReadPush, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified UnReadPush message, length delimited. Does not implicitly {@link UnReadPush.verify|verify} messages.
         * @param message UnReadPush message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: IUnReadPush, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an UnReadPush message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns UnReadPush
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): UnReadPush;

        /**
         * Decodes an UnReadPush message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns UnReadPush
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): UnReadPush;

        /**
         * Verifies an UnReadPush message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an UnReadPush message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns UnReadPush
         */
        public static fromObject(object: { [k: string]: any }): UnReadPush;

        /**
         * Creates a plain object from an UnReadPush message. Also converts values to other types if specified.
         * @param message UnReadPush
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: UnReadPush, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this UnReadPush to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a WatchVideoUdp. */
    interface IWatchVideoUdp {
    }

    /** 点击观看视频 */
    class WatchVideoUdp implements IWatchVideoUdp {

        /**
         * Constructs a new WatchVideoUdp.
         * @param [properties] Properties to set
         */
        constructor(properties?: IWatchVideoUdp);

        /**
         * Creates a new WatchVideoUdp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns WatchVideoUdp instance
         */
        public static create(properties?: IWatchVideoUdp): WatchVideoUdp;

        /**
         * Encodes the specified WatchVideoUdp message. Does not implicitly {@link WatchVideoUdp.verify|verify} messages.
         * @param message WatchVideoUdp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: IWatchVideoUdp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified WatchVideoUdp message, length delimited. Does not implicitly {@link WatchVideoUdp.verify|verify} messages.
         * @param message WatchVideoUdp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: IWatchVideoUdp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a WatchVideoUdp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns WatchVideoUdp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): WatchVideoUdp;

        /**
         * Decodes a WatchVideoUdp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns WatchVideoUdp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): WatchVideoUdp;

        /**
         * Verifies a WatchVideoUdp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a WatchVideoUdp message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns WatchVideoUdp
         */
        public static fromObject(object: { [k: string]: any }): WatchVideoUdp;

        /**
         * Creates a plain object from a WatchVideoUdp message. Also converts values to other types if specified.
         * @param message WatchVideoUdp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: WatchVideoUdp, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this WatchVideoUdp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a WithdrawalReq. */
    interface IWithdrawalReq {
    }

    /** 前端请求 红包余额/提现 页面查询 */
    class WithdrawalReq implements IWithdrawalReq {

        /**
         * Constructs a new WithdrawalReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: IWithdrawalReq);

        /**
         * Creates a new WithdrawalReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns WithdrawalReq instance
         */
        public static create(properties?: IWithdrawalReq): WithdrawalReq;

        /**
         * Encodes the specified WithdrawalReq message. Does not implicitly {@link WithdrawalReq.verify|verify} messages.
         * @param message WithdrawalReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: IWithdrawalReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified WithdrawalReq message, length delimited. Does not implicitly {@link WithdrawalReq.verify|verify} messages.
         * @param message WithdrawalReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: IWithdrawalReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a WithdrawalReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns WithdrawalReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): WithdrawalReq;

        /**
         * Decodes a WithdrawalReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns WithdrawalReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): WithdrawalReq;

        /**
         * Verifies a WithdrawalReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a WithdrawalReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns WithdrawalReq
         */
        public static fromObject(object: { [k: string]: any }): WithdrawalReq;

        /**
         * Creates a plain object from a WithdrawalReq message. Also converts values to other types if specified.
         * @param message WithdrawalReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: WithdrawalReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this WithdrawalReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a WithdrawalRet. */
    interface IWithdrawalRet {

        /** WithdrawalRet redBagBalance */
        redBagBalance?: (Long|null);

        /** WithdrawalRet redBagBalanceNull */
        redBagBalanceNull?: (Long|null);

        /** 小额提现 */
        smallwithdraw?: (ISmallWithdraw[]|null);

        /** 提现金额 */
        applyList?: (number[]|null);
    }

    /** 服务器响应 */
    class WithdrawalRet implements IWithdrawalRet {

        /**
         * Constructs a new WithdrawalRet.
         * @param [properties] Properties to set
         */
        constructor(properties?: IWithdrawalRet);

        /** WithdrawalRet redBagBalance. */
        public redBagBalance: Long;

        /** WithdrawalRet redBagBalanceNull. */
        public redBagBalanceNull: Long;

        /** 小额提现 */
        public smallwithdraw: ISmallWithdraw[];

        /** 提现金额 */
        public applyList: number[];

        /** 红包余额 */
        public redBagBalanceOne?: ("redBagBalance"|"redBagBalanceNull");

        /**
         * Creates a new WithdrawalRet instance using the specified properties.
         * @param [properties] Properties to set
         * @returns WithdrawalRet instance
         */
        public static create(properties?: IWithdrawalRet): WithdrawalRet;

        /**
         * Encodes the specified WithdrawalRet message. Does not implicitly {@link WithdrawalRet.verify|verify} messages.
         * @param message WithdrawalRet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: IWithdrawalRet, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified WithdrawalRet message, length delimited. Does not implicitly {@link WithdrawalRet.verify|verify} messages.
         * @param message WithdrawalRet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: IWithdrawalRet, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a WithdrawalRet message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns WithdrawalRet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): WithdrawalRet;

        /**
         * Decodes a WithdrawalRet message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns WithdrawalRet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): WithdrawalRet;

        /**
         * Verifies a WithdrawalRet message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a WithdrawalRet message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns WithdrawalRet
         */
        public static fromObject(object: { [k: string]: any }): WithdrawalRet;

        /**
         * Creates a plain object from a WithdrawalRet message. Also converts values to other types if specified.
         * @param message WithdrawalRet
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: WithdrawalRet, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this WithdrawalRet to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a SmallWithdraw. */
    interface ISmallWithdraw {

        /** SmallWithdraw level */
        level?: (number|null);

        /** SmallWithdraw levelNull */
        levelNull?: (number|null);

        /** SmallWithdraw amount */
        amount?: (Long|null);

        /** SmallWithdraw amountNull */
        amountNull?: (Long|null);
    }

    /** Represents a SmallWithdraw. */
    class SmallWithdraw implements ISmallWithdraw {

        /**
         * Constructs a new SmallWithdraw.
         * @param [properties] Properties to set
         */
        constructor(properties?: ISmallWithdraw);

        /** SmallWithdraw level. */
        public level: number;

        /** SmallWithdraw levelNull. */
        public levelNull: number;

        /** SmallWithdraw amount. */
        public amount: Long;

        /** SmallWithdraw amountNull. */
        public amountNull: Long;

        /** SmallWithdraw levelOne. */
        public levelOne?: ("level"|"levelNull");

        /** SmallWithdraw amountOne. */
        public amountOne?: ("amount"|"amountNull");

        /**
         * Creates a new SmallWithdraw instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SmallWithdraw instance
         */
        public static create(properties?: ISmallWithdraw): SmallWithdraw;

        /**
         * Encodes the specified SmallWithdraw message. Does not implicitly {@link SmallWithdraw.verify|verify} messages.
         * @param message SmallWithdraw message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: ISmallWithdraw, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SmallWithdraw message, length delimited. Does not implicitly {@link SmallWithdraw.verify|verify} messages.
         * @param message SmallWithdraw message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: ISmallWithdraw, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SmallWithdraw message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SmallWithdraw
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SmallWithdraw;

        /**
         * Decodes a SmallWithdraw message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SmallWithdraw
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SmallWithdraw;

        /**
         * Verifies a SmallWithdraw message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SmallWithdraw message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SmallWithdraw
         */
        public static fromObject(object: { [k: string]: any }): SmallWithdraw;

        /**
         * Creates a plain object from a SmallWithdraw message. Also converts values to other types if specified.
         * @param message SmallWithdraw
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: SmallWithdraw, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SmallWithdraw to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an ImmediateWithdrawalReq. */
    interface IImmediateWithdrawalReq {

        /** 提现金额(乘以100) */
        withdrawalAmount?: (Long|null);
    }

    /** 前端立即提现 */
    class ImmediateWithdrawalReq implements IImmediateWithdrawalReq {

        /**
         * Constructs a new ImmediateWithdrawalReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: IImmediateWithdrawalReq);

        /** 提现金额(乘以100) */
        public withdrawalAmount: Long;

        /**
         * Creates a new ImmediateWithdrawalReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ImmediateWithdrawalReq instance
         */
        public static create(properties?: IImmediateWithdrawalReq): ImmediateWithdrawalReq;

        /**
         * Encodes the specified ImmediateWithdrawalReq message. Does not implicitly {@link ImmediateWithdrawalReq.verify|verify} messages.
         * @param message ImmediateWithdrawalReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: IImmediateWithdrawalReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ImmediateWithdrawalReq message, length delimited. Does not implicitly {@link ImmediateWithdrawalReq.verify|verify} messages.
         * @param message ImmediateWithdrawalReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: IImmediateWithdrawalReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an ImmediateWithdrawalReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ImmediateWithdrawalReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ImmediateWithdrawalReq;

        /**
         * Decodes an ImmediateWithdrawalReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ImmediateWithdrawalReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ImmediateWithdrawalReq;

        /**
         * Verifies an ImmediateWithdrawalReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an ImmediateWithdrawalReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ImmediateWithdrawalReq
         */
        public static fromObject(object: { [k: string]: any }): ImmediateWithdrawalReq;

        /**
         * Creates a plain object from an ImmediateWithdrawalReq message. Also converts values to other types if specified.
         * @param message ImmediateWithdrawalReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: ImmediateWithdrawalReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ImmediateWithdrawalReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an ImmediateWithdrawalRet. */
    interface IImmediateWithdrawalRet {
    }

    /** 服务器响应 */
    class ImmediateWithdrawalRet implements IImmediateWithdrawalRet {

        /**
         * Constructs a new ImmediateWithdrawalRet.
         * @param [properties] Properties to set
         */
        constructor(properties?: IImmediateWithdrawalRet);

        /**
         * Creates a new ImmediateWithdrawalRet instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ImmediateWithdrawalRet instance
         */
        public static create(properties?: IImmediateWithdrawalRet): ImmediateWithdrawalRet;

        /**
         * Encodes the specified ImmediateWithdrawalRet message. Does not implicitly {@link ImmediateWithdrawalRet.verify|verify} messages.
         * @param message ImmediateWithdrawalRet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: IImmediateWithdrawalRet, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ImmediateWithdrawalRet message, length delimited. Does not implicitly {@link ImmediateWithdrawalRet.verify|verify} messages.
         * @param message ImmediateWithdrawalRet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: IImmediateWithdrawalRet, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an ImmediateWithdrawalRet message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ImmediateWithdrawalRet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ImmediateWithdrawalRet;

        /**
         * Decodes an ImmediateWithdrawalRet message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ImmediateWithdrawalRet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ImmediateWithdrawalRet;

        /**
         * Verifies an ImmediateWithdrawalRet message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an ImmediateWithdrawalRet message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ImmediateWithdrawalRet
         */
        public static fromObject(object: { [k: string]: any }): ImmediateWithdrawalRet;

        /**
         * Creates a plain object from an ImmediateWithdrawalRet message. Also converts values to other types if specified.
         * @param message ImmediateWithdrawalRet
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: ImmediateWithdrawalRet, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ImmediateWithdrawalRet to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a WithdrawalRecordReq. */
    interface IWithdrawalRecordReq {
    }

    /** 前端请求提现记录 100条 */
    class WithdrawalRecordReq implements IWithdrawalRecordReq {

        /**
         * Constructs a new WithdrawalRecordReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: IWithdrawalRecordReq);

        /**
         * Creates a new WithdrawalRecordReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns WithdrawalRecordReq instance
         */
        public static create(properties?: IWithdrawalRecordReq): WithdrawalRecordReq;

        /**
         * Encodes the specified WithdrawalRecordReq message. Does not implicitly {@link WithdrawalRecordReq.verify|verify} messages.
         * @param message WithdrawalRecordReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: IWithdrawalRecordReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified WithdrawalRecordReq message, length delimited. Does not implicitly {@link WithdrawalRecordReq.verify|verify} messages.
         * @param message WithdrawalRecordReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: IWithdrawalRecordReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a WithdrawalRecordReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns WithdrawalRecordReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): WithdrawalRecordReq;

        /**
         * Decodes a WithdrawalRecordReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns WithdrawalRecordReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): WithdrawalRecordReq;

        /**
         * Verifies a WithdrawalRecordReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a WithdrawalRecordReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns WithdrawalRecordReq
         */
        public static fromObject(object: { [k: string]: any }): WithdrawalRecordReq;

        /**
         * Creates a plain object from a WithdrawalRecordReq message. Also converts values to other types if specified.
         * @param message WithdrawalRecordReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: WithdrawalRecordReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this WithdrawalRecordReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a WithdrawalRecordRet. */
    interface IWithdrawalRecordRet {

        /** 提现记录 */
        applyInfo?: (IApplyInfo[]|null);
    }

    /** 服务器响应 */
    class WithdrawalRecordRet implements IWithdrawalRecordRet {

        /**
         * Constructs a new WithdrawalRecordRet.
         * @param [properties] Properties to set
         */
        constructor(properties?: IWithdrawalRecordRet);

        /** 提现记录 */
        public applyInfo: IApplyInfo[];

        /**
         * Creates a new WithdrawalRecordRet instance using the specified properties.
         * @param [properties] Properties to set
         * @returns WithdrawalRecordRet instance
         */
        public static create(properties?: IWithdrawalRecordRet): WithdrawalRecordRet;

        /**
         * Encodes the specified WithdrawalRecordRet message. Does not implicitly {@link WithdrawalRecordRet.verify|verify} messages.
         * @param message WithdrawalRecordRet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: IWithdrawalRecordRet, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified WithdrawalRecordRet message, length delimited. Does not implicitly {@link WithdrawalRecordRet.verify|verify} messages.
         * @param message WithdrawalRecordRet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: IWithdrawalRecordRet, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a WithdrawalRecordRet message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns WithdrawalRecordRet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): WithdrawalRecordRet;

        /**
         * Decodes a WithdrawalRecordRet message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns WithdrawalRecordRet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): WithdrawalRecordRet;

        /**
         * Verifies a WithdrawalRecordRet message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a WithdrawalRecordRet message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns WithdrawalRecordRet
         */
        public static fromObject(object: { [k: string]: any }): WithdrawalRecordRet;

        /**
         * Creates a plain object from a WithdrawalRecordRet message. Also converts values to other types if specified.
         * @param message WithdrawalRecordRet
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: WithdrawalRecordRet, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this WithdrawalRecordRet to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an ApplyInfo. */
    interface IApplyInfo {

        /** ApplyInfo applyTime */
        applyTime?: (string|null);

        /** ApplyInfo applyTimeNull */
        applyTimeNull?: (string|null);

        /** ApplyInfo balance */
        balance?: (Long|null);

        /** ApplyInfo balanceNull */
        balanceNull?: (Long|null);

        /** ApplyInfo status */
        status?: (Long|null);

        /** ApplyInfo statusNull */
        statusNull?: (Long|null);
    }

    /** Represents an ApplyInfo. */
    class ApplyInfo implements IApplyInfo {

        /**
         * Constructs a new ApplyInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: IApplyInfo);

        /** ApplyInfo applyTime. */
        public applyTime: string;

        /** ApplyInfo applyTimeNull. */
        public applyTimeNull: string;

        /** ApplyInfo balance. */
        public balance: Long;

        /** ApplyInfo balanceNull. */
        public balanceNull: Long;

        /** ApplyInfo status. */
        public status: Long;

        /** ApplyInfo statusNull. */
        public statusNull: Long;

        /** 申请时间戳 */
        public applyTimeOne?: ("applyTime"|"applyTimeNull");

        /** 金额 */
        public balanceOne?: ("balance"|"balanceNull");

        /** 状态 0成功 1失败 2处理中 */
        public statusOne?: ("status"|"statusNull");

        /**
         * Creates a new ApplyInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ApplyInfo instance
         */
        public static create(properties?: IApplyInfo): ApplyInfo;

        /**
         * Encodes the specified ApplyInfo message. Does not implicitly {@link ApplyInfo.verify|verify} messages.
         * @param message ApplyInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: IApplyInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ApplyInfo message, length delimited. Does not implicitly {@link ApplyInfo.verify|verify} messages.
         * @param message ApplyInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: IApplyInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an ApplyInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ApplyInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ApplyInfo;

        /**
         * Decodes an ApplyInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ApplyInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ApplyInfo;

        /**
         * Verifies an ApplyInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an ApplyInfo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ApplyInfo
         */
        public static fromObject(object: { [k: string]: any }): ApplyInfo;

        /**
         * Creates a plain object from an ApplyInfo message. Also converts values to other types if specified.
         * @param message ApplyInfo
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: ApplyInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ApplyInfo to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RedBagDetailsReq. */
    interface IRedBagDetailsReq {
    }

    /** 前端请求红包明细 100条 */
    class RedBagDetailsReq implements IRedBagDetailsReq {

        /**
         * Constructs a new RedBagDetailsReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: IRedBagDetailsReq);

        /**
         * Creates a new RedBagDetailsReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RedBagDetailsReq instance
         */
        public static create(properties?: IRedBagDetailsReq): RedBagDetailsReq;

        /**
         * Encodes the specified RedBagDetailsReq message. Does not implicitly {@link RedBagDetailsReq.verify|verify} messages.
         * @param message RedBagDetailsReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: IRedBagDetailsReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RedBagDetailsReq message, length delimited. Does not implicitly {@link RedBagDetailsReq.verify|verify} messages.
         * @param message RedBagDetailsReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: IRedBagDetailsReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RedBagDetailsReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RedBagDetailsReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): RedBagDetailsReq;

        /**
         * Decodes a RedBagDetailsReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RedBagDetailsReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): RedBagDetailsReq;

        /**
         * Verifies a RedBagDetailsReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RedBagDetailsReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RedBagDetailsReq
         */
        public static fromObject(object: { [k: string]: any }): RedBagDetailsReq;

        /**
         * Creates a plain object from a RedBagDetailsReq message. Also converts values to other types if specified.
         * @param message RedBagDetailsReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: RedBagDetailsReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RedBagDetailsReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RedBagDetailsRet. */
    interface IRedBagDetailsRet {

        /** 红包信息集合 */
        repeatedList?: (IRedBag[]|null);
    }

    /** 服务器响应红包明细 */
    class RedBagDetailsRet implements IRedBagDetailsRet {

        /**
         * Constructs a new RedBagDetailsRet.
         * @param [properties] Properties to set
         */
        constructor(properties?: IRedBagDetailsRet);

        /** 红包信息集合 */
        public repeatedList: IRedBag[];

        /**
         * Creates a new RedBagDetailsRet instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RedBagDetailsRet instance
         */
        public static create(properties?: IRedBagDetailsRet): RedBagDetailsRet;

        /**
         * Encodes the specified RedBagDetailsRet message. Does not implicitly {@link RedBagDetailsRet.verify|verify} messages.
         * @param message RedBagDetailsRet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: IRedBagDetailsRet, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RedBagDetailsRet message, length delimited. Does not implicitly {@link RedBagDetailsRet.verify|verify} messages.
         * @param message RedBagDetailsRet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: IRedBagDetailsRet, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RedBagDetailsRet message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RedBagDetailsRet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): RedBagDetailsRet;

        /**
         * Decodes a RedBagDetailsRet message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RedBagDetailsRet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): RedBagDetailsRet;

        /**
         * Verifies a RedBagDetailsRet message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RedBagDetailsRet message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RedBagDetailsRet
         */
        public static fromObject(object: { [k: string]: any }): RedBagDetailsRet;

        /**
         * Creates a plain object from a RedBagDetailsRet message. Also converts values to other types if specified.
         * @param message RedBagDetailsRet
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: RedBagDetailsRet, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RedBagDetailsRet to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RedBag. */
    interface IRedBag {

        /** RedBag operatorName */
        operatorName?: (string|null);

        /** RedBag operatorNameNull */
        operatorNameNull?: (string|null);

        /** RedBag redBagTime */
        redBagTime?: (Long|null);

        /** RedBag redBagTimeNull */
        redBagTimeNull?: (Long|null);

        /** RedBag balance */
        balance?: (Long|null);

        /** RedBag balanceNull */
        balanceNull?: (Long|null);
    }

    /** 红包信息 */
    class RedBag implements IRedBag {

        /**
         * Constructs a new RedBag.
         * @param [properties] Properties to set
         */
        constructor(properties?: IRedBag);

        /** RedBag operatorName. */
        public operatorName: string;

        /** RedBag operatorNameNull. */
        public operatorNameNull: string;

        /** RedBag redBagTime. */
        public redBagTime: Long;

        /** RedBag redBagTimeNull. */
        public redBagTimeNull: Long;

        /** RedBag balance. */
        public balance: Long;

        /** RedBag balanceNull. */
        public balanceNull: Long;

        /** 红包来源(签到奖励,随机红包,摊位升级,提现,宝箱红包等) */
        public operatorNameOne?: ("operatorName"|"operatorNameNull");

        /** 红包获取时间戳 */
        public redBagTimeOne?: ("redBagTime"|"redBagTimeNull");

        /** 金额(可能为负值) */
        public balanceOne?: ("balance"|"balanceNull");

        /**
         * Creates a new RedBag instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RedBag instance
         */
        public static create(properties?: IRedBag): RedBag;

        /**
         * Encodes the specified RedBag message. Does not implicitly {@link RedBag.verify|verify} messages.
         * @param message RedBag message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: IRedBag, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RedBag message, length delimited. Does not implicitly {@link RedBag.verify|verify} messages.
         * @param message RedBag message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: IRedBag, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RedBag message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RedBag
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): RedBag;

        /**
         * Decodes a RedBag message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RedBag
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): RedBag;

        /**
         * Verifies a RedBag message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RedBag message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RedBag
         */
        public static fromObject(object: { [k: string]: any }): RedBag;

        /**
         * Creates a plain object from a RedBag message. Also converts values to other types if specified.
         * @param message RedBag
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: RedBag, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RedBag to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a YellReq. */
    interface IYellReq {
    }

    /** 前端请求 点击吆喝 */
    class YellReq implements IYellReq {

        /**
         * Constructs a new YellReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: IYellReq);

        /**
         * Creates a new YellReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns YellReq instance
         */
        public static create(properties?: IYellReq): YellReq;

        /**
         * Encodes the specified YellReq message. Does not implicitly {@link YellReq.verify|verify} messages.
         * @param message YellReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: IYellReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified YellReq message, length delimited. Does not implicitly {@link YellReq.verify|verify} messages.
         * @param message YellReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: IYellReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a YellReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns YellReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): YellReq;

        /**
         * Decodes a YellReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns YellReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): YellReq;

        /**
         * Verifies a YellReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a YellReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns YellReq
         */
        public static fromObject(object: { [k: string]: any }): YellReq;

        /**
         * Creates a plain object from a YellReq message. Also converts values to other types if specified.
         * @param message YellReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: YellReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this YellReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a YellRet. */
    interface IYellRet {

        /** 吆喝次数 */
        yellCount?: (number|null);

        /** 剩余可吆喝次数 */
        surplusCount?: (number|null);

        /** 获得多少金币 */
        obtainMoney?: (Long|null);

        /** 是否触发红包 */
        isTriggerRedBag?: (boolean|null);

        /** 当前金币 */
        currentMoney?: (Long|null);

        /** 下一级需要 */
        nextLevelMoney?: (Long|null);
    }

    /** 服务器响应 */
    class YellRet implements IYellRet {

        /**
         * Constructs a new YellRet.
         * @param [properties] Properties to set
         */
        constructor(properties?: IYellRet);

        /** 吆喝次数 */
        public yellCount: number;

        /** 剩余可吆喝次数 */
        public surplusCount: number;

        /** 获得多少金币 */
        public obtainMoney: Long;

        /** 是否触发红包 */
        public isTriggerRedBag: boolean;

        /** 当前金币 */
        public currentMoney: Long;

        /** 下一级需要 */
        public nextLevelMoney: Long;

        /**
         * Creates a new YellRet instance using the specified properties.
         * @param [properties] Properties to set
         * @returns YellRet instance
         */
        public static create(properties?: IYellRet): YellRet;

        /**
         * Encodes the specified YellRet message. Does not implicitly {@link YellRet.verify|verify} messages.
         * @param message YellRet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: IYellRet, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified YellRet message, length delimited. Does not implicitly {@link YellRet.verify|verify} messages.
         * @param message YellRet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: IYellRet, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a YellRet message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns YellRet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): YellRet;

        /**
         * Decodes a YellRet message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns YellRet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): YellRet;

        /**
         * Verifies a YellRet message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a YellRet message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns YellRet
         */
        public static fromObject(object: { [k: string]: any }): YellRet;

        /**
         * Creates a plain object from a YellRet message. Also converts values to other types if specified.
         * @param message YellRet
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: YellRet, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this YellRet to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a YellRedBagReq. */
    interface IYellRedBagReq {
    }

    /** 吆喝触发红包-获取最高可得xx元 */
    class YellRedBagReq implements IYellRedBagReq {

        /**
         * Constructs a new YellRedBagReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: IYellRedBagReq);

        /**
         * Creates a new YellRedBagReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns YellRedBagReq instance
         */
        public static create(properties?: IYellRedBagReq): YellRedBagReq;

        /**
         * Encodes the specified YellRedBagReq message. Does not implicitly {@link YellRedBagReq.verify|verify} messages.
         * @param message YellRedBagReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: IYellRedBagReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified YellRedBagReq message, length delimited. Does not implicitly {@link YellRedBagReq.verify|verify} messages.
         * @param message YellRedBagReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: IYellRedBagReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a YellRedBagReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns YellRedBagReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): YellRedBagReq;

        /**
         * Decodes a YellRedBagReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns YellRedBagReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): YellRedBagReq;

        /**
         * Verifies a YellRedBagReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a YellRedBagReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns YellRedBagReq
         */
        public static fromObject(object: { [k: string]: any }): YellRedBagReq;

        /**
         * Creates a plain object from a YellRedBagReq message. Also converts values to other types if specified.
         * @param message YellRedBagReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: YellRedBagReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this YellRedBagReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a YellRedBagRet. */
    interface IYellRedBagRet {

        /** 金额 */
        balance?: (Long|null);
    }

    /** 服务器响应 */
    class YellRedBagRet implements IYellRedBagRet {

        /**
         * Constructs a new YellRedBagRet.
         * @param [properties] Properties to set
         */
        constructor(properties?: IYellRedBagRet);

        /** 金额 */
        public balance: Long;

        /**
         * Creates a new YellRedBagRet instance using the specified properties.
         * @param [properties] Properties to set
         * @returns YellRedBagRet instance
         */
        public static create(properties?: IYellRedBagRet): YellRedBagRet;

        /**
         * Encodes the specified YellRedBagRet message. Does not implicitly {@link YellRedBagRet.verify|verify} messages.
         * @param message YellRedBagRet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: IYellRedBagRet, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified YellRedBagRet message, length delimited. Does not implicitly {@link YellRedBagRet.verify|verify} messages.
         * @param message YellRedBagRet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: IYellRedBagRet, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a YellRedBagRet message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns YellRedBagRet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): YellRedBagRet;

        /**
         * Decodes a YellRedBagRet message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns YellRedBagRet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): YellRedBagRet;

        /**
         * Verifies a YellRedBagRet message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a YellRedBagRet message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns YellRedBagRet
         */
        public static fromObject(object: { [k: string]: any }): YellRedBagRet;

        /**
         * Creates a plain object from a YellRedBagRet message. Also converts values to other types if specified.
         * @param message YellRedBagRet
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: YellRedBagRet, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this YellRedBagRet to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a YellRedBagReceiveReq. */
    interface IYellRedBagReceiveReq {
    }

    /** 前端请求观看视频后领取红包 */
    class YellRedBagReceiveReq implements IYellRedBagReceiveReq {

        /**
         * Constructs a new YellRedBagReceiveReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: IYellRedBagReceiveReq);

        /**
         * Creates a new YellRedBagReceiveReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns YellRedBagReceiveReq instance
         */
        public static create(properties?: IYellRedBagReceiveReq): YellRedBagReceiveReq;

        /**
         * Encodes the specified YellRedBagReceiveReq message. Does not implicitly {@link YellRedBagReceiveReq.verify|verify} messages.
         * @param message YellRedBagReceiveReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: IYellRedBagReceiveReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified YellRedBagReceiveReq message, length delimited. Does not implicitly {@link YellRedBagReceiveReq.verify|verify} messages.
         * @param message YellRedBagReceiveReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: IYellRedBagReceiveReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a YellRedBagReceiveReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns YellRedBagReceiveReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): YellRedBagReceiveReq;

        /**
         * Decodes a YellRedBagReceiveReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns YellRedBagReceiveReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): YellRedBagReceiveReq;

        /**
         * Verifies a YellRedBagReceiveReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a YellRedBagReceiveReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns YellRedBagReceiveReq
         */
        public static fromObject(object: { [k: string]: any }): YellRedBagReceiveReq;

        /**
         * Creates a plain object from a YellRedBagReceiveReq message. Also converts values to other types if specified.
         * @param message YellRedBagReceiveReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: YellRedBagReceiveReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this YellRedBagReceiveReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a YellRedBagReceiveRet. */
    interface IYellRedBagReceiveRet {

        /** YellRedBagReceiveRet balance */
        balance?: (Long|null);

        /** YellRedBagReceiveRet balanceNull */
        balanceNull?: (Long|null);

        /** YellRedBagReceiveRet totalBalance */
        totalBalance?: (Long|null);

        /** YellRedBagReceiveRet totalBalanceNull */
        totalBalanceNull?: (Long|null);
    }

    /** 服务器响应 */
    class YellRedBagReceiveRet implements IYellRedBagReceiveRet {

        /**
         * Constructs a new YellRedBagReceiveRet.
         * @param [properties] Properties to set
         */
        constructor(properties?: IYellRedBagReceiveRet);

        /** YellRedBagReceiveRet balance. */
        public balance: Long;

        /** YellRedBagReceiveRet balanceNull. */
        public balanceNull: Long;

        /** YellRedBagReceiveRet totalBalance. */
        public totalBalance: Long;

        /** YellRedBagReceiveRet totalBalanceNull. */
        public totalBalanceNull: Long;

        /** 看完视频后 获得xx元(前端需要除100) */
        public balanceOne?: ("balance"|"balanceNull");

        /** 总金额 */
        public totalBalanceOne?: ("totalBalance"|"totalBalanceNull");

        /**
         * Creates a new YellRedBagReceiveRet instance using the specified properties.
         * @param [properties] Properties to set
         * @returns YellRedBagReceiveRet instance
         */
        public static create(properties?: IYellRedBagReceiveRet): YellRedBagReceiveRet;

        /**
         * Encodes the specified YellRedBagReceiveRet message. Does not implicitly {@link YellRedBagReceiveRet.verify|verify} messages.
         * @param message YellRedBagReceiveRet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: IYellRedBagReceiveRet, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified YellRedBagReceiveRet message, length delimited. Does not implicitly {@link YellRedBagReceiveRet.verify|verify} messages.
         * @param message YellRedBagReceiveRet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: IYellRedBagReceiveRet, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a YellRedBagReceiveRet message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns YellRedBagReceiveRet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): YellRedBagReceiveRet;

        /**
         * Decodes a YellRedBagReceiveRet message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns YellRedBagReceiveRet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): YellRedBagReceiveRet;

        /**
         * Verifies a YellRedBagReceiveRet message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a YellRedBagReceiveRet message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns YellRedBagReceiveRet
         */
        public static fromObject(object: { [k: string]: any }): YellRedBagReceiveRet;

        /**
         * Creates a plain object from a YellRedBagReceiveRet message. Also converts values to other types if specified.
         * @param message YellRedBagReceiveRet
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: YellRedBagReceiveRet, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this YellRedBagReceiveRet to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }
}
