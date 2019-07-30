<template>
<div>
    <table width="100%">
        <tr>
            <td>
                <router-view name="mh"></router-view>
            </td>
        </tr>
         <tr>
            <td width="20%">
                <router-view name="ms"></router-view>
            </td>
            <td width="80%">
                <router-view name="md"></router-view>
            </td>
        </tr>
         <tr>
            <td>
                <router-view name="mf"></router-view>
            </td>
        </tr>
    </table>
</div>
</template>
<script>
export default {
    
}
</script>
