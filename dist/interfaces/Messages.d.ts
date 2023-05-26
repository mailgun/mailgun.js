/// <reference types="node" />
/**
 * Ensures the object has least one key present and not undefined
 *
 * @see {@link https://stackoverflow.com/a/49725198}
 */
export type AtLeastOneKeyPresent<Object_, Keys extends keyof Object_ = keyof Object_> = Pick<Object_, Exclude<keyof Object_, Keys>> & {
    [K in Keys]-?: Required<Pick<Object_, K>> & Partial<Pick<Object_, Exclude<Keys, K>>>;
}[Keys];
export type MailgunMessageContent = AtLeastOneKeyPresent<{
    /**
     * Body of the message. (text version)
     */
    text?: string;
    /**
     * Body of the message. (HTML version)
     */
    html?: string;
    /**
     * Body of the message. (MIME version)
     */
    message?: string | Buffer | Blob;
    /**
    * Name of a template stored via [template API](https://documentation.mailgun.com/en/latest/api-templates.html#api-templates). See [Templates](https://documentation.mailgun.com/en/latest/user_manual.html#templating) for more information
    */
    template?: string;
}>;
export type MailgunMessageData = MailgunMessageContent & {
    /**
     * Email address for `From` header
     */
    from?: string;
    /**
     * Email address of the recipient(s).
     *
     * @example `Bob <bob@host.com>`. You can use commas to separate multiple recipients.
     */
    to?: string | string[];
    /**
     * Same as `To` but for `carbon copy`
     */
    cc?: string | string[];
    /**
     * Same as `To` but for `blind carbon copy`
     */
    bcc?: string | string[];
    /**
     * Message subject
     */
    subject?: string;
    /**
     * [AMP](https://developers.google.com/gmail/ampemail/) part of the message. Please follow google guidelines to compose and send AMP emails.
     */
    'amp-html'?: string;
    /**
     * File attachment. You can post multiple `attachment` values.
     *
     * **Important:** You must use `multipart/form-data` encoding when sending attachments.
     */
    attachment?: any;
    /**
     * Attachment with `inline` disposition. Can be used to send inline images (see example).
     *
     * You can post multiple `inline` values.
     */
    inline?: any;
    /**
     * Use this parameter to send a message to specific version of a template
     */
    't:version'?: string;
    /**
     * Pass `yes` if you want to have rendered template
     * in the text part of the message in case of template sending
     */
    't:text'?: boolean | 'yes' | 'no';
    /**
     * Tag string. See [Tagging](https://documentation.mailgun.com/en/latest/user_manual.html#tagging) for more information.
     */
    'o:tag'?: string | string[];
    /**
     * Enables/disables DKIM signatures on per-message basis. Pass `yes`, `no`, `true` or `false`
     */
    'o:dkim'?: boolean | 'yes' | 'no';
    /**
     * Desired time of delivery. See [Date Format](https://documentation.mailgun.com/en/latest/api-intro.html#date-format).
     *
     * Note: Messages can be scheduled for a maximum of 3 days in the future.
     */
    'o:deliverytime'?: string;
    /**
     * Toggles Send Time Optimization (STO) on a per-message basis.
     *
     * String should be set to the number of hours in `[0-9]+h` format,
     * with the minimum being `24h` and the maximum being `72h`.
     *
     * This value defines the time window in which Mailgun will run the optimization algorithm based on prior engagement data of a given recipient. See [Sending a message with STO](https://documentation.mailgun.com/en/latest/user_manual.html#sto-sending) for details.
     *
     * _Please note that STO is only available on certain plans.
     * See www.mailgun.com/pricing for more info._
     */
    'o:deliverytime-optimize-period'?: string;
    /**
     * Toggles Timezone Optimization (TZO) on a per message basis.
     *
     * String should be set to preferred delivery time in `HH:mm` or `hh:mmaa` format, where `HH:mm` is used for 24 hour format without AM/PM and `hh:mmaa` is used for 12 hour format with AM/PM. See [Sending a message with TZO](https://documentation.mailgun.com/en/latest/user_manual.html#tzo-sending) for details.
     *
     * Please note that TZO is only available on certain plans.
     * See www.mailgun.com/pricing for more info.
     */
    'o:time-zone-localize'?: string;
    /**
     * Enables sending in test mode. Pass `yes` if needed. See [Sending in Test Mode](https://documentation.mailgun.com/en/latest/user_manual.html#manual-testmode)
     */
    'o:testmode'?: boolean | 'yes' | 'no';
    /**
     * Toggles tracking on a per-message basis, see [Tracking Messages](https://documentation.mailgun.com/en/latest/user_manual.html#tracking-messages for details. Pass 'yes', 'no', 'true' or 'false'
     */
    'o:tracking'?: boolean | 'yes' | 'no';
    /**
     * Toggles clicks tracking on a per-message basis.
     * Has higher priority than domain-level setting.
     * Pass `yes`, `no`, `true`, `false` or `htmlonly`.
     */
    'o:tracking-clicks'?: boolean | 'yes' | 'no' | 'htmlonly';
    /**
     * Toggles opens tracking on a per-message basis.
     * Has higher priority than domain-level setting.
     *  Pass 'yes' or 'no', 'true' or 'false'
     */
    'o:tracking-opens'?: boolean | 'yes' | 'no';
    /**
     * If set to 'True' or 'yes' this requires the message only be sent over a TLS connection.
     * If a TLS connection can not be established, Mailgun will not deliver the message.
     *
     * If set to 'False' or 'no', Mailgun will still try and upgrade the connection,
     * but if Mailgun can not, the message will be delivered over a plaintext SMTP connection.
     *
     * The default is 'False'.
     */
    'o:require-tls'?: boolean | 'yes' | 'no';
    /**
     * If set to `True` or `yes`, the certificate and hostname will not be verified
     * when trying to establish a TLS connection
     * and Mailgun will accept any certificate during delivery.
     *
     * If set to `False` or `no`, Mailgun will verify the certificate and hostname.
     * If either one can not be verified, a TLS connection will not be established.
     *
     * The default is `False`.
     */
    'o:skip-verification'?: boolean | 'yes' | 'no';
    /**
     * A valid JSON-encoded dictionary, where key is a plain recipient address and value is a dictionary with variables that can be referenced in the message body. See [Batch Sending](https://documentation.mailgun.com/en/latest/user_manual.html#batch-sending) for more information.
     */
    'recipient-variables'?: string;
    /**
     * h:' prefix followed by an arbitrary value allows to append a custom MIME header
     * to the message ('X-My-Header' in this case).
     * For example, `h:Reply-To` to specify Reply-To address.
     */
    'h:X-My-Header'?: string;
    /**
     * `v:` prefix followed by an arbitrary name allows to attach a custom JSON data to the message. See [Attaching Data to Messages](https://documentation.mailgun.com/en/latest/user_manual.html#manual-customdata) for more information.
     */
    'v:my-var'?: string;
    [key: string]: any;
};
export interface MessagesSendAPIResponse {
    status: number;
    body: {
        id: string;
        message: string;
    };
}
export interface MessagesSendResult {
    id?: string;
    message?: string;
    status: number;
    details?: string;
}
