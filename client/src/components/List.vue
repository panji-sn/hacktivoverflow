<template>
      <div id="">
        <div class="row sm-2 ml-2">
            <div class="col-2">
                <slot name="totalVotes"></slot>
                <slot name="totalAnswers"></slot>
                <slot name="totalViews"></slot>
                <slot name="voteAnswer"></slot>
            </div>
            <div class="col-10">
                <slot name="questionList"></slot>
                <slot name="questionList2"></slot>
                <slot name="answerList"></slot>
            </div>
        </div>
      </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
