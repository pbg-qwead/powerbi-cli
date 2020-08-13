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
import { getGatewayID, getGroupUrl } from "../../lib/helpers";
import { validateParameter, validateGroupId, validateDatasetId } from "../../lib/parameters";

export async function updateGatewayAction(cmd: ModuleCommand): Promise<void> {
    const options = cmd.opts();
    if (options.H) return;

    const groupId = await validateGroupId(options.W, false);
    const datasetId = await validateDatasetId(groupId as string, options.D, true);
    const gatewayId = await validateParameter({
        name: options.watewayId,
        isName: () => getGatewayID(options.watewayId),
        missing: "error: missing option '--gateway'",
        isRequired: true,
    });
    debug(`Update the binding to a gateway of a Power BI dataset (${datasetId}) in group (${groupId || "my"})`);
    const request: APICall = {
        method: "POST",
        url: `${getGroupUrl(groupId)}/datasets/${datasetId}/Default.BindToGateway`,
        body: {
            gatewayObjectId: gatewayId,
            datasourceObjectIds: options.datasourceIds ? [options.datasourceIds] : [],
        },
    };
    await executeAPICall(request);
}
