/*
 * Copyright (c) 2020 Jan Pieter Posthuma / DataScenarios
 *
 * All rights reserved.
 *
 * MIT License.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the "Software"), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */

"use strict";

import { ModuleCommand } from "../../lib/command";
import { debug } from "../../lib/logging";
import { APICall, executeAPICall } from "../../lib/api";
import { validateAdminGroupId } from "../../lib/parameters";
import { checkUUID } from "../../lib/validate";

export async function restoreAction(cmd: ModuleCommand): Promise<void> {
    const options = cmd.opts();
    if (options.H) return;
    let groupId, groupName;
    const groupLookup = await validateAdminGroupId(options.G, true, true);
    if (checkUUID(groupLookup as string)) {
        groupId = groupLookup;
        groupName = options.G;
    } else {
        groupId = options.G;
        groupName = groupLookup;
    }
    const emailAddress = options.owner;
    if (!emailAddress) throw "error: missing option '--owner'";
    let name = options.name;
    if (!name) name = groupName;
    debug(`Restores a deleted workspace`);
    const request: APICall = {
        method: "POST",
        url: `/admin/groups/${groupId}/restore`,
        body: {
            emailAddress,
            name,
        },
        containsValue: false,
    };
    await executeAPICall(request, cmd.outputFormat, cmd.outputFile, cmd.jmsePath);
}
