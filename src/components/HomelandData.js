import { useEffect, useState } from "react"
import axios from 'axios';
import { Image, Text, Flex, Grid, GridItem } from '@chakra-ui/react'
import PlotData from "./PlotData";
import AccountData from "./AccountData";

export default function HomelandData(props) {
    let obj = [
        {
            "id": 525794,
            "x": -30,
            "y": 1,
            "land_type": 4,
            "land_property": 2,
            "name": "1. CASTLE DOOM (MW)",
            "townhall_level": 10,
            "owner": {
                "id": 1640,
                "account_name": "Flying Falcon x MOTZ",
                "address": "0x268d43c69868ceb6de8bb4754fdf068ded71637d"
            },
            "created_at": 0,
            "duration": 0,
            "plotData": [
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T18:00:00",
                    "amount": 102000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T17:00:00",
                    "amount": 612000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T16:00:00",
                    "amount": 306000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T15:00:00",
                    "amount": 714000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T14:00:00",
                    "amount": 102000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T13:00:00",
                    "amount": 204000
                },
                {
                    "from_action": 2,
                    "created_at": "2023-10-01T12:00:00",
                    "amount": 204000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T12:00:00",
                    "amount": 306000
                },
                {
                    "from_action": 2,
                    "created_at": "2023-10-01T11:00:00",
                    "amount": 204000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T11:00:00",
                    "amount": 306000
                },
                {
                    "from_action": 2,
                    "created_at": "2023-10-01T10:00:00",
                    "amount": 204000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T10:00:00",
                    "amount": 612000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T09:00:00",
                    "amount": 510000
                },
                {
                    "from_action": 2,
                    "created_at": "2023-10-01T08:00:00",
                    "amount": 204000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T08:00:00",
                    "amount": 408000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T07:00:00",
                    "amount": 408000
                },
                {
                    "from_action": 2,
                    "created_at": "2023-10-01T06:00:00",
                    "amount": 204000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T06:00:00",
                    "amount": 102000
                }
            ]
        },
        {
            "id": 526818,
            "x": -30,
            "y": 2,
            "land_type": 4,
            "land_property": 2,
            "name": "2. DOOMSTADT (MW) ",
            "townhall_level": 7,
            "owner": {
                "id": 1640,
                "account_name": "Flying Falcon x MOTZ",
                "address": "0x268d43c69868ceb6de8bb4754fdf068ded71637d"
            },
            "created_at": 0,
            "duration": 0,
            "plotData": [
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T15:00:00",
                    "amount": 420000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T14:00:00",
                    "amount": 306000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T13:00:00",
                    "amount": 306000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T12:00:00",
                    "amount": 306000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T11:00:00",
                    "amount": 204000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T10:00:00",
                    "amount": 510000
                },
                {
                    "from_action": 2,
                    "created_at": "2023-10-01T09:00:00",
                    "amount": 204000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T09:00:00",
                    "amount": 714000
                },
                {
                    "from_action": 2,
                    "created_at": "2023-10-01T08:00:00",
                    "amount": 204000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T08:00:00",
                    "amount": 714000
                },
                {
                    "from_action": 2,
                    "created_at": "2023-10-01T07:00:00",
                    "amount": 612000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T07:00:00",
                    "amount": 408000
                },
                {
                    "from_action": 2,
                    "created_at": "2023-10-01T06:00:00",
                    "amount": 204000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T06:00:00",
                    "amount": 102000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T04:00:00",
                    "amount": 204000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T03:00:00",
                    "amount": 306000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T02:00:00",
                    "amount": 306000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T01:00:00",
                    "amount": 408000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T00:00:00",
                    "amount": 102000
                }
            ]
        },
        {
            "id": 527842,
            "x": -30,
            "y": 3,
            "land_type": 4,
            "land_property": 1,
            "name": "3. Latveria (SUGAR)",
            "townhall_level": 7,
            "owner": {
                "id": 1640,
                "account_name": "Flying Falcon x MOTZ",
                "address": "0x268d43c69868ceb6de8bb4754fdf068ded71637d"
            },
            "created_at": 0,
            "duration": 0,
            "plotData": [
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T18:00:00",
                    "amount": 306000
                },
                {
                    "from_action": 2,
                    "created_at": "2023-10-01T17:00:00",
                    "amount": 204000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T17:00:00",
                    "amount": 408000
                },
                {
                    "from_action": 2,
                    "created_at": "2023-10-01T12:00:00",
                    "amount": 204000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T11:00:00",
                    "amount": 306000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T10:00:00",
                    "amount": 408000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T09:00:00",
                    "amount": 204000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T08:00:00",
                    "amount": 612000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T07:00:00",
                    "amount": 408000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T06:00:00",
                    "amount": 204000
                },
                {
                    "from_action": 2,
                    "created_at": "2023-09-30T18:00:00",
                    "amount": 175200
                },
                {
                    "from_action": 3,
                    "created_at": "2023-09-30T18:00:00",
                    "amount": 102000
                }
            ]
        },
        {
            "id": 528866,
            "x": -30,
            "y": 4,
            "land_type": 4,
            "land_property": 2,
            "name": "4. Valeria",
            "townhall_level": 7,
            "owner": {
                "id": 1640,
                "account_name": "Flying Falcon x MOTZ",
                "address": "0x268d43c69868ceb6de8bb4754fdf068ded71637d"
            },
            "created_at": 0,
            "duration": 0,
            "plotData": [
                {
                    "from_action": 2,
                    "created_at": "2023-10-01T18:00:00",
                    "amount": 204000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T18:00:00",
                    "amount": 306000
                },
                {
                    "from_action": 2,
                    "created_at": "2023-10-01T17:00:00",
                    "amount": 204000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T17:00:00",
                    "amount": 306000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T16:00:00",
                    "amount": 102000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T15:00:00",
                    "amount": 306000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T14:00:00",
                    "amount": 408000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T13:00:00",
                    "amount": 204000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T12:00:00",
                    "amount": 102000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T10:00:00",
                    "amount": 306000
                },
                {
                    "from_action": 2,
                    "created_at": "2023-10-01T09:00:00",
                    "amount": 204000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T09:00:00",
                    "amount": 408000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T08:00:00",
                    "amount": 204000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T07:00:00",
                    "amount": 306000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T06:00:00",
                    "amount": 408000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T05:00:00",
                    "amount": 102000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T04:00:00",
                    "amount": 612000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T03:00:00",
                    "amount": 306000
                },
                {
                    "from_action": 2,
                    "created_at": "2023-10-01T02:00:00",
                    "amount": 204000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T02:00:00",
                    "amount": 204000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T01:00:00",
                    "amount": 204000
                },
                {
                    "from_action": 2,
                    "created_at": "2023-10-01T00:00:00",
                    "amount": 204000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T00:00:00",
                    "amount": 408000
                },
                {
                    "from_action": 2,
                    "created_at": "2023-09-30T18:00:00",
                    "amount": 114000
                }
            ]
        },
        {
            "id": 530914,
            "x": -30,
            "y": 6,
            "land_type": 4,
            "land_property": 2,
            "name": "5. BattleWorld",
            "townhall_level": 8,
            "owner": {
                "id": 1640,
                "account_name": "Flying Falcon x MOTZ",
                "address": "0x268d43c69868ceb6de8bb4754fdf068ded71637d"
            },
            "created_at": 0,
            "duration": 0,
            "plotData": [
                {
                    "from_action": 2,
                    "created_at": "2023-10-01T18:00:00",
                    "amount": 204000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T18:00:00",
                    "amount": 204000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T17:00:00",
                    "amount": 612000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T16:00:00",
                    "amount": 306000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T15:00:00",
                    "amount": 408000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T14:00:00",
                    "amount": 408000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T13:00:00",
                    "amount": 306000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T12:00:00",
                    "amount": 306000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T11:00:00",
                    "amount": 408000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T10:00:00",
                    "amount": 102000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T09:00:00",
                    "amount": 408000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T08:00:00",
                    "amount": 306000
                },
                {
                    "from_action": 2,
                    "created_at": "2023-10-01T07:00:00",
                    "amount": 204000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T07:00:00",
                    "amount": 306000
                },
                {
                    "from_action": 2,
                    "created_at": "2023-10-01T06:00:00",
                    "amount": 204000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T06:00:00",
                    "amount": 306000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T02:00:00",
                    "amount": 102000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T01:00:00",
                    "amount": 102000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T00:00:00",
                    "amount": 102000
                }
            ]
        },
        {
            "id": 529890,
            "x": -30,
            "y": 5,
            "land_type": 4,
            "land_property": 2,
            "name": "6. Earth 616",
            "townhall_level": 8,
            "owner": {
                "id": 1640,
                "account_name": "Flying Falcon x MOTZ",
                "address": "0x268d43c69868ceb6de8bb4754fdf068ded71637d"
            },
            "created_at": 0,
            "duration": 0,
            "plotData": [
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T18:00:00",
                    "amount": 204000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T17:00:00",
                    "amount": 306000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T16:00:00",
                    "amount": 102000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T15:00:00",
                    "amount": 306000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T14:00:00",
                    "amount": 510000
                },
                {
                    "from_action": 2,
                    "created_at": "2023-10-01T13:00:00",
                    "amount": 204000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T13:00:00",
                    "amount": 102000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T12:00:00",
                    "amount": 102000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T11:00:00",
                    "amount": 510000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T10:00:00",
                    "amount": 408000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T09:00:00",
                    "amount": 204000
                },
                {
                    "from_action": 2,
                    "created_at": "2023-10-01T08:00:00",
                    "amount": 408000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T08:00:00",
                    "amount": 612000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T07:00:00",
                    "amount": 510000
                },
                {
                    "from_action": 2,
                    "created_at": "2023-10-01T06:00:00",
                    "amount": 204000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T00:00:00",
                    "amount": 102000
                }
            ]
        },
        {
            "id": 531938,
            "x": -30,
            "y": 7,
            "land_type": 4,
            "land_property": 1,
            "name": "7. Hollowuud (AG)",
            "townhall_level": 7,
            "owner": {
                "id": 1640,
                "account_name": "Flying Falcon x MOTZ",
                "address": "0x268d43c69868ceb6de8bb4754fdf068ded71637d"
            },
            "created_at": 0,
            "duration": 0,
            "plotData": [
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T18:00:00",
                    "amount": 306000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T17:00:00",
                    "amount": 306000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T16:00:00",
                    "amount": 408000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T15:00:00",
                    "amount": 306000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T14:00:00",
                    "amount": 306000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T13:00:00",
                    "amount": 510000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T12:00:00",
                    "amount": 306000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T11:00:00",
                    "amount": 204000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T10:00:00",
                    "amount": 204000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T08:00:00",
                    "amount": 510000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T07:00:00",
                    "amount": 510000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T06:00:00",
                    "amount": 102000
                }
            ]
        },
        {
            "id": 532962,
            "x": -30,
            "y": 8,
            "land_type": 4,
            "land_property": 2,
            "name": "8. The Killiseum",
            "townhall_level": 7,
            "owner": {
                "id": 1640,
                "account_name": "Flying Falcon x MOTZ",
                "address": "0x268d43c69868ceb6de8bb4754fdf068ded71637d"
            },
            "created_at": 0,
            "duration": 0,
            "plotData": [
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T18:00:00",
                    "amount": 102000
                },
                {
                    "from_action": 2,
                    "created_at": "2023-10-01T17:00:00",
                    "amount": 204000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T17:00:00",
                    "amount": 102000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T16:00:00",
                    "amount": 204000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T15:00:00",
                    "amount": 102000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T14:00:00",
                    "amount": 306000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T13:00:00",
                    "amount": 204000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T12:00:00",
                    "amount": 102000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T11:00:00",
                    "amount": 408000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T10:00:00",
                    "amount": 408000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T09:00:00",
                    "amount": 204000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T08:00:00",
                    "amount": 408000
                },
                {
                    "from_action": 2,
                    "created_at": "2023-10-01T07:00:00",
                    "amount": 204000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T07:00:00",
                    "amount": 306000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T06:00:00",
                    "amount": 204000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T03:00:00",
                    "amount": 408000
                },
                {
                    "from_action": 2,
                    "created_at": "2023-10-01T02:00:00",
                    "amount": 204000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T02:00:00",
                    "amount": 102000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T01:00:00",
                    "amount": 204000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T00:00:00",
                    "amount": 510000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-09-30T22:00:00",
                    "amount": 12000
                },
                {
                    "from_action": 2,
                    "created_at": "2023-09-30T21:00:00",
                    "amount": 408000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-09-30T21:00:00",
                    "amount": 204000
                },
                {
                    "from_action": 2,
                    "created_at": "2023-09-30T20:00:00",
                    "amount": 204000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-09-30T20:00:00",
                    "amount": 306000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-09-30T19:00:00",
                    "amount": 102000
                },
                {
                    "from_action": 2,
                    "created_at": "2023-09-30T18:00:00",
                    "amount": 204000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-09-30T18:00:00",
                    "amount": 102000
                }
            ]
        },
        {
            "id": 533986,
            "x": -30,
            "y": 9,
            "land_type": 4,
            "land_property": 2,
            "name": "9. The Empire",
            "townhall_level": 7,
            "owner": {
                "id": 1640,
                "account_name": "Flying Falcon x MOTZ",
                "address": "0x268d43c69868ceb6de8bb4754fdf068ded71637d"
            },
            "created_at": 0,
            "duration": 0,
            "plotData": [
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T18:00:00",
                    "amount": 204000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T17:00:00",
                    "amount": 612000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T15:00:00",
                    "amount": 204000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T14:00:00",
                    "amount": 102000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T13:00:00",
                    "amount": 102000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T11:00:00",
                    "amount": 306000
                },
                {
                    "from_action": 2,
                    "created_at": "2023-10-01T10:00:00",
                    "amount": 204000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T10:00:00",
                    "amount": 612000
                },
                {
                    "from_action": 2,
                    "created_at": "2023-10-01T08:00:00",
                    "amount": 204000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T08:00:00",
                    "amount": 204000
                },
                {
                    "from_action": 2,
                    "created_at": "2023-10-01T07:00:00",
                    "amount": 204000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T07:00:00",
                    "amount": 306000
                },
                {
                    "from_action": 2,
                    "created_at": "2023-10-01T06:00:00",
                    "amount": 204000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T04:00:00",
                    "amount": 612000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T02:00:00",
                    "amount": 102000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T01:00:00",
                    "amount": 714000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T00:00:00",
                    "amount": 204000
                },
                {
                    "from_action": 2,
                    "created_at": "2023-09-30T20:00:00",
                    "amount": 204000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-09-30T20:00:00",
                    "amount": 277200
                },
                {
                    "from_action": 2,
                    "created_at": "2023-09-30T19:00:00",
                    "amount": 408000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-09-30T19:00:00",
                    "amount": 204000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-09-30T18:00:00",
                    "amount": 408000
                }
            ]
        },
        {
            "id": 550370,
            "x": -30,
            "y": 25,
            "land_type": 4,
            "land_property": 0,
            "name": "Elysium gen 1",
            "townhall_level": 8,
            "owner": {
                "id": 235076,
                "account_name": "Aur X Mark Of The Zeal",
                "address": "0x7e53a655b089e03ff809e61b60b3ea98e35fb21b"
            },
            "created_at": 0,
            "duration": 0,
            "plotData": [
                {
                    "from_action": 2,
                    "created_at": "2023-10-01T17:00:00",
                    "amount": 318000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T15:00:00",
                    "amount": 306000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T14:00:00",
                    "amount": 204000
                },
                {
                    "from_action": 2,
                    "created_at": "2023-10-01T13:00:00",
                    "amount": 204000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T13:00:00",
                    "amount": 510000
                },
                {
                    "from_action": 2,
                    "created_at": "2023-10-01T12:00:00",
                    "amount": 204000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T12:00:00",
                    "amount": 714000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T11:00:00",
                    "amount": 204000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T10:00:00",
                    "amount": 408000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T09:00:00",
                    "amount": 408000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T08:00:00",
                    "amount": 408000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T07:00:00",
                    "amount": 306000
                },
                {
                    "from_action": 2,
                    "created_at": "2023-10-01T06:00:00",
                    "amount": 816000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T06:00:00",
                    "amount": 204000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T05:00:00",
                    "amount": 204000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T04:00:00",
                    "amount": 204000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T02:00:00",
                    "amount": 510000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T01:00:00",
                    "amount": 102000
                },
                {
                    "from_action": 2,
                    "created_at": "2023-10-01T00:00:00",
                    "amount": 204000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T00:00:00",
                    "amount": 102000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-09-30T21:00:00",
                    "amount": 114000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-09-30T20:00:00",
                    "amount": 510000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-09-30T19:00:00",
                    "amount": 306000
                },
                {
                    "from_action": 2,
                    "created_at": "2023-09-30T18:00:00",
                    "amount": 204000
                }
            ]
        },
        {
            "id": 521698,
            "x": -30,
            "y": -3,
            "land_type": 4,
            "land_property": 0,
            "name": "Valhalla",
            "townhall_level": 8,
            "owner": {
                "id": 235076,
                "account_name": "Aur X Mark Of The Zeal",
                "address": "0x7e53a655b089e03ff809e61b60b3ea98e35fb21b"
            },
            "created_at": 0,
            "duration": 0,
            "plotData": [
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T18:00:00",
                    "amount": 204000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T17:00:00",
                    "amount": 510000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T16:00:00",
                    "amount": 306000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T15:00:00",
                    "amount": 306000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T14:00:00",
                    "amount": 306000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T13:00:00",
                    "amount": 306000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T12:00:00",
                    "amount": 612000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T11:00:00",
                    "amount": 510000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T10:00:00",
                    "amount": 510000
                },
                {
                    "from_action": 2,
                    "created_at": "2023-10-01T09:00:00",
                    "amount": 204000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T09:00:00",
                    "amount": 510000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T08:00:00",
                    "amount": 306000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T07:00:00",
                    "amount": 612000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T06:00:00",
                    "amount": 102000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T01:00:00",
                    "amount": 102000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T00:00:00",
                    "amount": 204000
                }
            ]
        },
        {
            "id": 461211,
            "x": -101,
            "y": -62,
            "land_type": 2,
            "land_property": 2,
            "name": "Arctico",
            "townhall_level": 9,
            "owner": {
                "id": 1353,
                "account_name": "Cream",
                "address": "0x0fd64eef118f88ea4886f01e4af1c373bbb6b286"
            },
            "created_at": 0,
            "duration": 0,
            "plotData": [
                {
                    "from_action": 1,
                    "created_at": "2023-10-01T17:00:00",
                    "amount": 9000
                },
                {
                    "from_action": 2,
                    "created_at": "2023-10-01T17:00:00",
                    "amount": 4500
                },
                {
                    "from_action": 4,
                    "created_at": "2023-10-01T17:00:00",
                    "amount": 1800
                },
                {
                    "from_action": 1,
                    "created_at": "2023-10-01T16:00:00",
                    "amount": 9000
                },
                {
                    "from_action": 2,
                    "created_at": "2023-10-01T16:00:00",
                    "amount": 18000
                },
                {
                    "from_action": 1,
                    "created_at": "2023-10-01T15:00:00",
                    "amount": 13500
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T15:00:00",
                    "amount": 4500
                },
                {
                    "from_action": 1,
                    "created_at": "2023-10-01T14:00:00",
                    "amount": 4500
                },
                {
                    "from_action": 2,
                    "created_at": "2023-10-01T14:00:00",
                    "amount": 4500
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T14:00:00",
                    "amount": 4500
                },
                {
                    "from_action": 4,
                    "created_at": "2023-10-01T14:00:00",
                    "amount": 9900
                },
                {
                    "from_action": 1,
                    "created_at": "2023-10-01T13:00:00",
                    "amount": 4500
                },
                {
                    "from_action": 2,
                    "created_at": "2023-10-01T13:00:00",
                    "amount": 18000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T13:00:00",
                    "amount": 4500
                },
                {
                    "from_action": 2,
                    "created_at": "2023-10-01T12:00:00",
                    "amount": 13500
                }
            ]
        },
        {
            "id": 390606,
            "x": -50,
            "y": -131,
            "land_type": 1,
            "land_property": 1,
            "name": "Foresto",
            "townhall_level": 6,
            "owner": {
                "id": 1353,
                "account_name": "Cream",
                "address": "0x0fd64eef118f88ea4886f01e4af1c373bbb6b286"
            },
            "created_at": 0,
            "duration": 0,
            "plotData": [
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T18:00:00",
                    "amount": 1500
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T17:00:00",
                    "amount": 2250
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T16:00:00",
                    "amount": 3000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T15:00:00",
                    "amount": 1500
                },
                {
                    "from_action": 1,
                    "created_at": "2023-10-01T14:00:00",
                    "amount": 3000
                },
                {
                    "from_action": 3,
                    "created_at": "2023-10-01T14:00:00",
                    "amount": 5250
                },
                {
                    "from_action": 1,
                    "created_at": "2023-10-01T13:00:00",
                    "amount": 1500
                },
                {
                    "from_action": 2,
                    "created_at": "2023-10-01T13:00:00",
                    "amount": 1500
                }
            ]
        },
        {
            "id": 402841,
            "x": -103,
            "y": -119,
            "land_type": 1,
            "land_property": 1,
            "name": "Jungle",
            "townhall_level": 5,
            "owner": {
                "id": 1353,
                "account_name": "Cream",
                "address": "0x0fd64eef118f88ea4886f01e4af1c373bbb6b286"
            },
            "created_at": 0,
            "duration": 0,
            "plotData": []
        },
        {
            "id": 386441,
            "x": -119,
            "y": -135,
            "land_type": 0,
            "land_property": 2,
            "name": "Savanno",
            "townhall_level": 5,
            "owner": {
                "id": 1353,
                "account_name": "Cream",
                "address": "0x0fd64eef118f88ea4886f01e4af1c373bbb6b286"
            },
            "created_at": 0,
            "duration": 0,
            "plotData": []
        }
    ]

    const [plots, setPlots] = useState(obj)
    const [total, setTotal] = useState(0)
    const [amount, setAmount] = useState(0)
    const accounts = props.accounts

    useEffect(() => {
        const fetchData = async () => {
            let renderData = []
            let total = 0
            let amount = 0
            let today = new Date()
            let toDate = today.getFullYear() + '-' + (today.getUTCMonth() + 1 < 10 ? "0" + (today.getUTCMonth() + 1) : today.getUTCMonth() + 1) + '-' + (today.getUTCDate() < 10 ? "0" + today.getUTCDate() : today.getUTCDate())

            for(let i = 0 ; i < accounts.length ; i++){
                let account = accounts[i]
                let accessToken = account.accessToken
                await axios.post('/api/getPlots', { accessToken }).then(async (response) => {
                    let data = response.data
                    if (data.success) {
                        let plots = data.plots
                        plots.sort(function (a, b) { return parseInt(b.land_type) - parseInt(a.land_type) })
                        for (let i = 0; i < plots.length; i++) {
                            let obj = plots[i]
                            let plotData = (await axios.post('/api/getPlotDetail', { accessToken, plotData: obj })).data
                            if (plotData.success) {
                                plots[i].plotData = plotData.data
                                amount+= plotData.data.filter(obj => obj.created_at.startsWith(toDate)).reduce(function (sum, item) {
                                    return sum + item.amount
                                }, 0)
                                total+= plots[i].land_type == 0 ? 16 : plots[i].land_type == 1 ? 52 : plots[i].land_type == 2 ? 148 : plots[i].land_type == 3 ? 328 : 6540
                            }
                            // setPlots(plots)
                        }
                        renderData = [...renderData, ...plots]
                        setPlots(renderData)
                        setAmount(amount / 1000)
                        setTotal(total)
                    }
                })
            }
        }
        fetchData()
    }, [])

    useEffect(() => {

    }, [plots])

    const renderAccount = () => {
        if(accounts != undefined && accounts.length > 0){
            let renderItems = accounts.map((account, index) =>{
                return(
                    <AccountData key={index} account={account}/>
                )
            })
            return renderItems
        }
        
        
    }

    return (
        <Flex w={'100%'} flexDirection={'column'}>
                <>{renderAccount()}</>
        </Flex>
    )
}