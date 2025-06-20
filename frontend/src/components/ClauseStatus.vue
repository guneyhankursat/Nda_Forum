<template>
    <div :class="['clause', presentClass]">
      <span class="clause-title">{{ capitalizedClauseName }}:</span>
      <span class="clause-status">{{ data.present }}</span>
      <div v-if="data.present === 'PRESENT'">
        <span class="clause-snippet">{{ data.snippet }}</span>
      </div>
      <div v-else class="clause-guidance">
        <span>⚠️ {{ guidance }}</span>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';

  const props = defineProps(['clauseName', 'data']);
  const guidances = {
    confidentiality: "Consider adding a confidentiality clause to protect sensitive info.",
    term: "Specify how long NDA obligations last.",
    jurisdiction: "Add the governing law for this agreement.",
    remedies: "Describe remedies for breached NDA.",
    exclusions: "List exclusions to confidentiality.",
    signatures: "Ensure both parties sign the agreement."
  };
  const guidance = guidances[props.clauseName] || "Clause missing. Please review.";
  const presentClass = props.data.present === "PRESENT" ? "present" : "absent";

  const capitalizedClauseName = computed(() => {
    if (!props.clauseName) return '';
    return props.clauseName.charAt(0).toUpperCase() + props.clauseName.slice(1);
  });
  </script>
  
  <style scoped>
  .clause { 
    margin: 10px 0; 
    padding: 15px; 
    border-radius: 8px; 
    border: 1px solid #e0e0e0;
  }

  .present { 
    background: #f0fff4; 
    border-color: #68d391;
  }

  .absent { 
    background: #fff5f5; 
    border-color: #fc8181;
  }

  .clause-title { 
    font-weight: bold; 
    color: #2d3748;
    display: block;
    margin-bottom: 5px;
  }

  .clause-status { 
    margin-left: 8px; 
    font-weight: 600;
    color: #4a5568;
  }

  .clause-snippet { 
    display: block; 
    margin-top: 8px; 
    font-style: italic; 
    color: #2d3748;
    background: #f7fafc;
    padding: 8px;
    border-radius: 4px;
    border-left: 3px solid #4299e1;
  }

  .clause-guidance { 
    color: #d35400; 
    margin-top: 8px; 
    font-size: 0.9em;
  }
  </style>